# MedicSpa - Healthcare & Wellness Website

A modern, responsive website for healthcare and wellness services built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Service catalog
- Online shop
- Event management
- Blog section
- Customer reviews
- Contact form
- SEO optimized

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Headless UI
- Hero Icons
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/medicspa.git
cd medicspa
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## Project Structure

```
medicspa/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Shop.tsx
│   │   ├── Events.tsx
│   │   ├── Blog.tsx
│   │   ├── Reviews.tsx
│   │   └── Contact.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
