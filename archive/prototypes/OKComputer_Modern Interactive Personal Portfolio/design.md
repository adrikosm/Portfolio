# Andreas Mavropoulos Portfolio - Design Style Guide

## Design Philosophy

### Visual Language
**Modern Professional Minimalism** - Clean, sophisticated design that emphasizes content over decoration. The aesthetic draws inspiration from contemporary tech publications like Wired and The Verge, combining editorial elegance with technical precision.

### Color Palette
**Primary Colors:**
- **Deep Charcoal**: #1a1a1a (primary text, dark mode background)
- **Pure White**: #ffffff (light mode background, contrast text)
- **Accent Blue**: #007ced (links, buttons, interactive elements)
- **Soft Gray**: #6b7280 (secondary text, borders)

**Supporting Colors:**
- **Success Green**: #10b981 (form success states)
- **Warning Amber**: #f59e0b (form validation)
- **Error Red**: #ef4444 (error states)

### Typography
**Primary Font**: Inter (sans-serif) - Clean, modern, highly readable
- **Display Text**: 48px-72px, weight 700-900
- **Heading Text**: 24px-36px, weight 600-700
- **Body Text**: 16px-18px, weight 400-500
- **Caption Text**: 14px, weight 400

**Secondary Font**: JetBrains Mono (monospace) - For code snippets and technical content
- **Code Text**: 14px-16px, weight 400

### Layout Principles
- **Grid System**: 12-column responsive grid with 24px gutters
- **Spacing Scale**: 8px base unit (8px, 16px, 24px, 32px, 48px, 64px)
- **Container Width**: Max 1200px with 32px horizontal padding
- **Section Padding**: 80px vertical, 32px horizontal

## Visual Effects

### Background Treatment
**Aurora Gradient Flow**: Animated gradient background using CSS custom properties
- **Light Mode**: Subtle linear gradient from #f8fafc to #e2e8f0
- **Dark Mode**: Deep gradient from #0f172a to #1e293b
- **Animation**: Slow 20-second color shift cycle

### Interactive Elements
**Hover Effects:**
- **Cards**: 3D tilt (5deg) with expanded shadow
- **Buttons**: Color morphing with glow edge
- **Images**: Zoom scale (1.05x) with overlay reveal
- **Links**: Animated underline expansion

**Animation Timing:**
- **Fast**: 150ms (micro-interactions)
- **Medium**: 300ms (state changes)
- **Slow**: 500ms (page transitions)

### Component Styling

#### Navigation Bar
- **Height**: 80px
- **Background**: Glass morphism effect (rgba(255,255,255,0.1) with backdrop-blur)
- **Shadow**: Subtle drop shadow for depth
- **Sticky**: Fixed position with scroll-aware opacity

#### Hero Section
- **Layout**: Split-screen (60/40) on desktop, stacked on mobile
- **Background**: Animated particle system using p5.js
- **Typography**: Large display text with typewriter animation
- **CTA Button**: Gradient background with hover glow

#### Skills Grid
- **Card Design**: Rounded corners (12px), subtle border
- **Hover State**: Lift effect with increased shadow
- **Icon Treatment**: 48px icons with brand colors
- **Layout**: Responsive grid (5 columns desktop, 2 mobile)

#### Project Cards
- **Aspect Ratio**: 16:9 for consistency
- **Overlay**: Gradient mask with project details
- **Technology Tags**: Pill-shaped badges with tech colors
- **Interaction**: Smooth scale and opacity transitions

#### Contact Form
- **Input Style**: Floating labels with border animation
- **Focus State**: Accent color border with glow
- **Validation**: Real-time feedback with color coding
- **Submit Button**: Loading state with spinner animation

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### Accessibility Considerations
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Focus Indicators**: Visible outline for keyboard navigation
- **Motion**: Respects prefers-reduced-motion settings
- **Alt Text**: Descriptive text for all images and icons

### Performance Optimizations
- **Image Formats**: WebP with JPEG fallback
- **Font Loading**: Font-display: swap for faster rendering
- **CSS**: Critical CSS inlined, non-critical deferred
- **Animations**: Hardware-accelerated transforms only