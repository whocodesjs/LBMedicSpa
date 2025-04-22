/**
 * Navbar Component
 *
 * A responsive navigation bar component that includes:
 * - Mobile and desktop navigation
 * - Dropdown menus for sub-items
 * - Scroll-aware styling
 * - Smooth animations using Framer Motion
 *
 * @component
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

/**
 * Interface for menu items
 */
interface MenuItem {
  label: string;
  path: string;
  subItems?: { label: string; path: string }[];
}

/**
 * Menu items configuration
 */
const menuItems: MenuItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    path: "/services",
    subItems: [
      { label: "Laser Hair Removal", path: "/services" },
      { label: "Microneedling", path: "/services" },
      { label: "Chemical Peels", path: "/services" },
      { label: "Neurotoxin Injections (Botox/Dysport)", path: "/services" },
      { label: "IV Vitamin Therapy", path: "/services" },
      { label: "Hair Restoration with PRP/PRF", path: "/services" },
      { label: "One on One Consultation", path: "/services" },
    ],
  },
  {
    label: "Events",
    path: "/events",
    subItems: [
      { label: "Upcoming Events", path: "/events" },
      { label: "Wellness Classes", path: "/events" },
    ],
  },
  { label: "Shop", path: "/shop" },
  { label: "Blog", path: "/blog" },
  {
    label: "Contact",
    path: "/contact",
    subItems: [
      { label: "Get in Touch", path: "/contact" },
      { label: "Reviews", path: "/reviews" },
    ],
  },
];

/**
 * Animation variants for the mobile menu
 */
const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

/**
 * Navbar Component
 *
 * @returns {JSX.Element} The rendered Navbar component
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  /**
   * Handle scroll event to update navbar styling
   */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    // Throttle scroll event listener
    const throttledScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const scrollHandler = throttledScroll();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [handleScroll]);

  /**
   * Toggle submenu visibility
   * @param {string} label - The label of the menu item
   */
  const toggleSubmenu = useCallback(
    (label: string) => {
      setActiveSubmenu(activeSubmenu === label ? null : label);
    },
    [activeSubmenu]
  );

  /**
   * Close mobile menu
   */
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, []);

  // Memoize the navbar class to prevent unnecessary re-renders
  const navbarClass = useMemo(
    () =>
      `fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : ""
      }`,
    [isScrolled]
  );

  return (
    <>
      <header
        className={navbarClass}
        style={{ zIndex: 1000 }}
        role="banner"
        aria-label="Main navigation">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-medium" aria-label="Home">
              MedicSpa
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/book-appointment"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
                aria-label="Book an appointment">
                Book Appointment
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-900 hover:bg-neutral-50 transition-all duration-300"
                aria-label="Open menu"
                aria-expanded={isOpen}>
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              style={{ zIndex: 1001 }}
              onClick={closeMenu}
              role="presentation"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 bottom-0 right-0 w-[50vw] bg-white/95 backdrop-blur-md overflow-hidden"
              style={{ zIndex: 1002 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-end gap-4 p-4">
                  <Link
                    to="/book-appointment"
                    onClick={closeMenu}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
                    aria-label="Book an appointment">
                    <span>Book Appointment</span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </motion.svg>
                  </Link>
                  <button
                    onClick={closeMenu}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-all duration-300"
                    aria-label="Close menu">
                    <XMarkIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                    <span>Close</span>
                  </button>
                </div>
                <div className="flex-1 px-8 py-6">
                  <div className="space-y-6">
                    {menuItems.map((item) => (
                      <div
                        key={item.label}
                        className="border-b border-neutral-200/80 pb-6">
                        {item.subItems ? (
                          <>
                            <button
                              onClick={() => toggleSubmenu(item.label)}
                              className="flex w-full items-center justify-between text-2xl font-medium tracking-tight text-neutral-900 hover:text-neutral-600 transition-all duration-300"
                              aria-expanded={activeSubmenu === item.label}>
                              {item.label}
                              <motion.span
                                animate={{
                                  rotate: activeSubmenu === item.label ? 45 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="text-xl"
                                aria-hidden="true">
                                +
                              </motion.span>
                            </button>
                            <AnimatePresence>
                              {activeSubmenu === item.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden">
                                  <div className="space-y-3 pt-4">
                                    {item.subItems.map((subItem) => (
                                      <Link
                                        key={subItem.label}
                                        to={subItem.path}
                                        onClick={closeMenu}
                                        className="block pl-4 text-base text-neutral-600 hover:text-neutral-900 transition-all duration-300">
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={closeMenu}
                            className="block text-2xl font-medium tracking-tight text-neutral-900 hover:text-neutral-600 transition-all duration-300">
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
