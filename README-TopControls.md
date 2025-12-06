# TopControls (Floating Back/Home)

Adds floating Back and Home controls outside the header.

## Files
- `src/components/TopControls.jsx`: Component with accessibility and debounce.
- `src/components/TopControls.module.css`: Glass/neon styling with dark/light variants.
- `src/components/TopControls.test.js`: Minimal test stub.

## Integration
Import and render near the app root so buttons float above all pages:

```jsx
import TopControls from './components/TopControls';

// Inside your root layout (e.g., App.js)
<TopControls
  homeRoute="/"
  backButtonOffset={{ top: 12, left: 12 }}
  homeButtonOffset={{ top: 12, right: 12 }}
  autoHideOnScroll={false}
/>
```

Buttons use `position: fixed` and safe-area insets to avoid overlapping mobile notches.

## Configuration
- `HOME_ROUTE` via `homeRoute` prop (default `/`).
- `backButtonOffset` and `homeButtonOffset` to adjust for header overlap.
- `autoHideOnScroll` to hide when scrolling down.

## Behavior
- Back: `history.back()` with fallback to home.
- Home: navigates to `homeRoute` using React Router if present, else `window.location.href`.
- Debounce: 300ms to prevent double navigation.

## Tests
Run frontend tests:

```cmd
cd c:\expense-tracker\frontend
npm test
```

Expand `TopControls.test.js` to assert specific navigation with mocks.

## UX Extras
- Slide-in animation on mount (CSS transitions).
- Optional auto-hide on scroll.
- Unread badge stub on Home icon — wire to your notifications.
