/**
 * App Component
 *
 * The main application component that sets up:
 * - Routing configuration
 * - Theme provider
 * - Global layout structure
 * - Navigation and page components
 *
 * @component
 * @example
 * ```tsx
 * <App />
 * ```
 */

import React, { Suspense, lazy, useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import HoldToEnter from "./components/HoldToEnter";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const BookAppointment = lazy(() => import("./pages/BookAppointment"));
const Shop = lazy(() => import("./pages/Shop"));
const Events = lazy(() => import("./pages/Events"));
const Blog = lazy(() => import("./pages/Blog"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));

// Loading component
const LoadingFallback = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
));
LoadingFallback.displayName = "LoadingFallback";

// ScrollToTop component
const ScrollToTop = React.memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
});
ScrollToTop.displayName = "ScrollToTop";

// Layout component
const Layout = React.memo(({ children }: { children: React.ReactNode }) => {
  const [showHoldToEnter, setShowHoldToEnter] = useState(true);

  const handleComplete = useCallback(() => {
    setShowHoldToEnter(false);
  }, []);

  if (showHoldToEnter) {
    return <HoldToEnter onComplete={handleComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";

// Create routes with modern Data Router API
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto", // Ensure scroll reset on navigation
    },
    {
      path: "/services",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto",
    },
    {
      path: "/book-appointment",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <BookAppointment />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto",
    },
    {
      path: "/shop",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Shop />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto",
    },
    {
      path: "/events",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Events />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto",
    },
    {
      path: "/blog",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Blog />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto",
    },
    {
      path: "/reviews",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Reviews />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto",
    },
    {
      path: "/contact",
      element: (
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </Layout>
      ),
      scrollBehavior: "auto",
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

/**
 * App Component
 *
 * @returns {JSX.Element} The rendered App component
 */
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default React.memo(App);
