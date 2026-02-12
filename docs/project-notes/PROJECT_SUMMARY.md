# Project Summary

## Overview
This is a React-based personal portfolio website for Andreas Mavropoulos, a Senior Data Engineer. The project uses React 18, Tailwind CSS, and Framer Motion for animations. It features a responsive design with a dark/light mode theme system (Ocean Breeze theme).

## File Structure

### Root Directory
- **CLAUDE.md**: Comprehensive guide for Claude Code, detailing architecture, commands, and styling.
- **VISUAL_GUIDE.md**: Detailed record of visual changes, before/after comparisons, and design improvements.
- **Hiring_Manager.md**: A detailed assessment of the candidate (Andreas Mavropoulos) from a hiring manager's perspective.
- **package.json**: Project dependencies and scripts. Key deps: `react`, `framer-motion`, `tailwindcss`, `typewriter-effect`.
- **tailwind.config.js**: Tailwind CSS configuration, defining custom colors (primary, secondary, github, linkedin) and breakpoints.
- **CHANGES_SUMMARY.md**: Summary of changes made to the project.
- **IMPLEMENTATION_REPORT.md** & **COMPREHENSIVE_IMPLEMENTATION_REPORT.md**: Reports on implementation details.

### Source Directory (`src/`)
- **App.jsx**: Main application component. Handles theme state (dark/light), scroll-to-top logic, and renders main sections.
- **index.css**: Global styles, CSS variables for themes, typography, and animations.
- **index.js**: Entry point.
- **responsive.css**: Additional responsive styling.
- **components/**: Contains individual section components.
    - **header/**: Navigation and theme toggle.
    - **about/**: Hero section with typewriter effect.
    - **personal/**: Skills and personal info.
    - **experience/**: Work history timeline.
    - **projects/**: Project showcase with modals.
    - **certifications/**: Certifications display.
    - **interests/**: Interests section.
    - **contact/**: Contact form and info.
    - **footer/**: Footer component.

## Technology Stack

### Core
- **React 18.2.0**: Modern React with hooks
- **React Scripts 5.0.1**: Create React App build system

### Styling
- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **Custom CSS Variables**: Extensive theming system in `index.css`

### Animation & Interaction
- **Framer Motion 11.0.0**: Advanced animation library
- **react-intersection-observer 9.5.3**: Scroll-based triggers
- **typewriter-effect 2.21.0**: Typewriter text animation

### Icons & UI
- **FontAwesome 6.5.1**: Comprehensive icon library
  - Core, Solid, Regular, and Brands icons

## Key Features

### 1. Single Page Application
- All content on one scrollable page
- Smooth scroll navigation with 80px header offset
- Sections: Header → About → Personal → Experience → Projects → Certifications → Interests → Contact → Footer

### 2. Theme System
- **Dark Mode (Default)**: Dark backgrounds with cyan accents
- **Light Mode (Ocean Breeze)**: Light blue-white backgrounds with ocean accents
- Theme persisted in localStorage
- Smooth transitions between modes
- Toggle button in header with sun/moon icons

### 3. Responsive Design
- Mobile-first approach
- Custom breakpoint: `phone: 850px`
- Fully responsive across all device sizes
- Mobile navigation with slide-in overlay menu

### 4. Animations & Interactivity
- **Scroll Animations**: Components animate when entering viewport
- **Hover Effects**: Buttons, cards, and tech icons respond to interaction
- **Staggered Animations**: Sequential child animations in grid layouts
- **Floating Effects**: Background gradient elements with subtle motion
- **Mouse-Following Glow**: Creative glow effect on resume button

### 5. Performance
- Lazy state initialization for theme
- Optimized animations (60fps target)
- Accessible with keyboard navigation
- WCAG 2.1 AA compliant

## Component Breakdown

### Header
- Desktop: Horizontal navigation menu
- Mobile: Hamburger menu with slide-in overlay
- Theme toggle button (sun/moon icon)
- Social links (GitHub, LinkedIn)
- Scroll-based styling changes at 50px

### About (Hero)
- Greeting and name
- Professional title: "Data Engineer" (static)
- Description paragraph
- Profile image with floating animation
- Two CTA buttons: "View Resume" and "Get In Touch"
- Scroll indicator (auto-hides after scrolling)

### Personal (Skills)
- Technologies & Tools showcase
- Tech card grid with icons
- Hover effects: icon rotation, color-matched shadows, accent bars
- Stats section: Years of experience, Projects, Technologies

### Experience
- Work timeline
- Company cards with role, duration, and achievements
- Quantifiable metrics (60% reductions, 40% improvements)

### Projects
- Project showcase cards
- Click to open modal with details
- GitHub links
- Technology tags

### Certifications
- Certification display area

### Interests
- Personal interests section

### Contact
- Contact form/information
- CTA for communication

### Footer
- Copyright notice
- "All rights reserved" text
- Centered, minimal design

## Development Workflow

### Available Scripts
```bash
npm start       # Development server (port 3000)
npm run build   # Production build
npm test        # Run tests with Jest
npm install     # Install dependencies
```

### Project Status
- Ready for production deployment
- All requirements implemented
- Professional, modern design
- Optimized for performance and accessibility
