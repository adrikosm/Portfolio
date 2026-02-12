# Andreas Mavropoulos - Portfolio

A modern, responsive personal portfolio website built with React 18 and Tailwind CSS. Features smooth animations, dark/light theme switching, and a clean single-page layout.

## Preview

The site includes the following sections:

- **Hero** -- Animated intro with typewriter effect and downloadable resume
- **Skills** -- Technical skills and personal info
- **Experience** -- Work experience timeline
- **Projects** -- Project showcase
- **Certifications** -- Professional certifications
- **Interests** -- Personal interests
- **Contact** -- Contact form and info

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Styling | Tailwind CSS 3, CSS custom properties |
| Animations | Framer Motion 11 |
| Icons | FontAwesome 6 |
| Build Tool | Create React App (react-scripts 5) |
| Other | typewriter-effect, react-intersection-observer |

## Getting Started

### Prerequisites

- Node.js >= 16
- npm

### Installation

```bash
git clone https://github.com/adrikosm/Portfolio.git
cd Portfolio
npm install
```

### Development

```bash
npm start
```

Runs the app at [http://localhost:3000](http://localhost:3000) with hot reloading.

### Production Build

```bash
npm run build
```

Outputs optimized static files to the `build/` directory, ready for deployment.

### Tests

```bash
npm test         # watch mode
npm run test:ci  # single run (CI)
```

## Project Structure

```
src/
├── App.jsx                        # Root layout, theme state, scroll-to-top
├── index.js                       # Entry point
├── index.css                      # Global styles, CSS variables, theme definitions
├── assets/                        # Images, resume PDF
└── components/
    ├── about/                     # Hero section with typewriter effect
    ├── personal/                  # Skills & personal info
    ├── experience/                # Work experience timeline
    ├── projects/                  # Project showcase
    ├── certifications/            # Certifications display
    ├── interests/                 # Interests section
    ├── contact/                   # Contact form
    ├── header/                    # Navigation, mobile menu, theme toggle
    └── footer/                    # Footer with social links
```

Each component is self-contained with its own `.jsx` and `.css` file.

## Features

- **Dark / Light Mode** -- Theme persists via localStorage; defaults to dark
- **Responsive Design** -- Mobile-first layout with a slide-in navigation menu
- **Scroll Animations** -- Viewport-triggered animations using Intersection Observer
- **Smooth Scrolling** -- Header-offset-aware smooth scroll to sections
- **Mouse-following Glow** -- Interactive glow effect on the resume button
- **Scroll-to-Top Button** -- Appears after scrolling 400px with fade animation

## License

This project is open source and available under the [MIT License](LICENSE).
