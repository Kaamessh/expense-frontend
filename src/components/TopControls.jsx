import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopControls.module.css';

// Configurable defaults
const HOME_ROUTE_DEFAULT = '/';

// Debounce helper
function useDebouncedHandler(handler, delay = 300) {
  const lastCallRef = useRef(0);
  return (e) => {
    const now = Date.now();
    if (now - lastCallRef.current < delay) return;
    lastCallRef.current = now;
    handler(e);
  };
}

// Detect unread notifications (stubbed) — replace with your app's state
function useUnreadBadge() {
  const [count] = useState(0); // TODO: wire to real notifications
  return count;
}

/**
 * Floating Back and Home controls positioned outside header using fixed overlay.
 * - Accessible: aria-label, title, role, keyboard handlers
 * - Responsive: collapses Back label on small screens
 * - Safe areas: uses env(safe-area-inset-*)
 * - Behavior: back() with fallback to HOME_ROUTE; home() navigates to HOME_ROUTE
 * - Performance: debounced clicks to prevent double navigations
 */
export default function TopControls({
  homeRoute = HOME_ROUTE_DEFAULT,
  backButtonOffset = { top: 12, left: 12 },
  homeButtonOffset = { top: 12, right: 12 },
  autoHideOnScroll = false,
}) {
  // Prefer react-router if available; fallback to location
  let navigate;
  try {
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const unreadCount = useUnreadBadge();

  // Detect current location for hiding Back on Home and tooltip state
  const [isHome, setIsHome] = useState(false);
  useEffect(() => {
    const check = () => {
      // Works with HashRouter and regular paths
      const hash = window.location.hash || '';
      const path = hash.startsWith('#') ? hash.replace('#', '') : window.location.pathname;
      // Normalize to route only, strip query
      const route = (path || '/').split('?')[0];
      setIsHome(route === homeRoute || route === '/' || route === '');
    };
    check();
    window.addEventListener('hashchange', check);
    window.addEventListener('popstate', check);
    return () => {
      window.removeEventListener('hashchange', check);
      window.removeEventListener('popstate', check);
    };
  }, [homeRoute]);

  // Auto-hide on scroll (optional)
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (!autoHideOnScroll) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const curY = window.scrollY;
      setHidden(curY > lastY && curY - lastY > 8); // hide when scrolling down
      lastY = curY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [autoHideOnScroll]);

  const backHandler = useDebouncedHandler(() => {
    // Try router-compatible back first
    if (window.history && window.history.length > 1) {
      window.history.back();
      return;
    }
    // Fallback to home route
    if (navigate) navigate(homeRoute);
    else window.location.href = homeRoute;
  });

  const homeHandler = useDebouncedHandler(() => {
    if (navigate) navigate(homeRoute);
    else window.location.href = homeRoute;
  });

  // Keyboard accessibility
  const onKeyActivate = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler(e);
    }
  };

  const backStyle = useMemo(() => ({
    top: `calc(${backButtonOffset.top}px + env(safe-area-inset-top, 0px))`,
    left: `calc(${backButtonOffset.left}px + env(safe-area-inset-left, 0px))`,
  }), [backButtonOffset]);

  const homeStyle = useMemo(() => ({
    top: `calc(${homeButtonOffset.top}px + env(safe-area-inset-top, 0px))`,
    right: `calc(${homeButtonOffset.right}px + env(safe-area-inset-right, 0px))`,
  }), [homeButtonOffset]);

  return (
    <div className={`${styles.overlay} ${hidden ? styles.hidden : ''}`} aria-hidden={hidden}>
      {!isHome && (
      <button
        type="button"
        className={styles.backButton}
        style={backStyle}
        onClick={backHandler}
        onKeyDown={(e) => onKeyActivate(e, backHandler)}
        aria-label="Go back"
        title="Go back"
        role="button"
      >
        <span className={styles.backIcon} aria-hidden>←</span>
        <span className={styles.backLabel}>Back</span>
      </button>
      )}

      <button
        type="button"
        className={styles.homeButton}
        style={homeStyle}
        onClick={homeHandler}
        onKeyDown={(e) => onKeyActivate(e, homeHandler)}
        aria-label="Go to Home"
        title={isHome ? 'You are on Home' : 'Go to Home'}
        role="button"
      >
        <span className={styles.homeIcon} aria-hidden>🏠</span>
        {unreadCount > 0 && (
          <span className={styles.badge} aria-label={`${unreadCount} unread`}>{unreadCount}</span>
        )}
      </button>
    </div>
  );
}
