# Portfolio Design System

This document records the implemented visual and motion system for the Shivam Shelatkar portfolio.

## Visual direction

- **Mood**: minimal, editorial, cinematic, engineering-led.
- **Palette**: graphite ink `#0b0e10`, warm paper `#f2f0e9`, signal lime `#c7f35a`, cyan `#66e3ff`, warm orange `#ff7a4d`, muted UI gray `#8a918c`.
- **Typography**: Inter for UI and body, a serif display stack for headlines, a monospace stack for metadata and labels.
- **Layout**: generous gutters, a 1240px max content width, strong vertical rhythm, and intentional stillness between dense sections.

## Motion principles

- **One easing curve**: `cubic-bezier(0.16, 1, 0.3, 1)` for UI and content reveals.
- **Duration tiers**:
  - Micro: 160ms
  - UI: 320ms
  - Content: 680ms
  - Cinematic: 1100ms
- **Library responsibilities**:
  - **GSAP + ScrollTrigger**: scroll choreography, pinned reveals, and section timing.
  - **Lenis**: smooth scrolling synchronized with the GSAP ticker.
  - **Motion for React**: page transitions, menu transitions, hover states, and shared project layout.
  - **React Three Fiber**: hero terrain visual only; lazy-loaded with a CSS fallback.
- **Reduced motion**: `prefers-reduced-motion` disables smooth scroll, cursor, page transitions, and long animations.

## Component architecture

- `app/layout.tsx`: metadata, providers, header, page transition, footer.
- `components/layout/`: providers, header, footer, page transition, scroll progress.
- `components/hero/`: hero copy and dynamic terrain scene.
- `components/motion/`: reveal primitive using GSAP ScrollTrigger.
- `components/projects/`: project card and procedural project visuals.
- `components/cursor/`: contextual custom cursor for pointer devices.
- `lib/projects.ts`: verified project data and helpers.

## Responsive strategy

- Mobile-first CSS with breakpoints at 640px, 768px, 900px, and 1200px.
- Project grid collapses from three columns to one on small screens.
- Navigation becomes a full-screen mobile menu with keyboard support.
- Hero type scales with viewport width.

## Accessibility rules

- Semantic HTML, visible focus rings, and keyboard navigation.
- `aria-label`, `aria-expanded`, and `aria-modal` on interactive elements.
- No content hidden behind hover only.
- Reduced motion respected globally.
- Custom cursor is hidden on touch and reduced-motion devices.

## Performance rules

- Hero WebGL is dynamically imported and only renders when visible.
- No external images; visuals are inline SVG or CSS.
- Fonts use a system-first stack with an optional external import.
- Scroll handlers are managed through GSAP and Lenis, not raw listeners.
- Three.js renderer caps device pixel ratio at 1.5.
