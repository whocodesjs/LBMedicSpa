/**
 * Navbar Component
 *
 * A responsive navigation bar component that follows Apple's Human Interface Guidelines:
 * - Depth and translucency effects
 * - Smooth animations and transitions
 * - Refined typography and spacing
 * - Enhanced accessibility
 * - Elegant mobile menu
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
 * Spring animation config for smooth, immediate transitions
 */
const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.5,
  restDelta: 0.0001,
};

/**
 * Smooth transition config
 */
const smoothTransition = {
  type: "tween",
  duration: 0.2,
  ease: [0.32, 0.72, 0, 1],
};

/**
 * Animation variants for the mobile menu
 */
const menuVariants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: springConfig,
  },
  open: {
    x: "0%",
    opacity: 1,
    transition: springConfig,
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    transition: smoothTransition,
  },
  open: {
    opacity: 1,
    transition: smoothTransition,
  },
};

/**
 * Submenu animation variants
 */
const submenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { ...smoothTransition },
      opacity: { duration: 0.1, ease: "easeOut" },
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { ...smoothTransition },
      opacity: { duration: 0.1, ease: "easeIn" },
    },
  },
};

/**
 * Button hover animation variants
 */
const buttonHoverVariants = {
  initial: {
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 0)",
    y: 0,
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(245, 245, 245, 0.95)",
    y: -1,
    transition: smoothTransition,
  },
  tap: {
    scale: 0.98,
    backgroundColor: "rgba(235, 235, 235, 1)",
    y: 1,
    transition: {
      ...smoothTransition,
      duration: 0.1,
    },
  },
};

/**
 * Close icon animation variants
 */
const closeIconVariants = {
  initial: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: 90,
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
    },
  },
};

/**
 * Close button animation variants
 */
const closeButtonVariants = {
  initial: {
    scale: 1,
    rotate: 0,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  hover: {
    scale: 1.1,
    backgroundColor: "rgba(245, 245, 245, 0.95)",
    transition: {
      ...smoothTransition,
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
    backgroundColor: "rgba(235, 235, 235, 1)",
    transition: {
      ...smoothTransition,
      duration: 0.1,
    },
  },
  exit: {
    scale: 0.9,
    rotate: 90,
    opacity: 0,
    transition: {
      ...smoothTransition,
      duration: 0.2,
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
      `fixed top-0 left-0 right-0 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] supports-[backdrop-filter]:bg-white/60"
          : "bg-transparent"
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
        <nav className="mx-auto max-w-[1280px] px-6 md:px-8 lg:px-10 py-4 md:py-5">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight text-neutral-900 hover:opacity-80 transition-all duration-300"
              aria-label="Home">
              MedicSpa
            </Link>
            <div className="flex items-center gap-4 md:gap-5">
              <Link
                to="/book-appointment"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-[17px] font-medium text-white hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                aria-label="Book an appointment">
                Book Appointment
              </Link>
              <motion.button
                onClick={() => setIsOpen(true)}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHoverVariants}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200/80 p-2.5 text-neutral-900 transition-all duration-300"
                aria-label="Open menu"
                aria-expanded={isOpen}>
                <Bars3Icon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-[4px] supports-[backdrop-filter]:bg-black/5 md:block hidden"
              style={{ zIndex: 1001 }}
              onClick={closeMenu}
              role="presentation"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[420px] bg-white md:bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col"
              style={{
                zIndex: 1002,
                willChange: "transform",
                height: "100dvh",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu">
              <motion.div
                variants={menuItemVariants}
                className="flex items-center justify-between px-6 py-4 border-b border-neutral-100"
                style={{ willChange: "transform, opacity" }}>
                <span className="text-[28px] font-semibold tracking-tight">
                  Menu
                </span>
                <motion.button
                  onClick={closeMenu}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverVariants}
                  className="inline-flex items-center justify-center rounded-full p-2.5 text-neutral-500 transition-all duration-200"
                  aria-label="Close menu">
                  <motion.div
                    variants={closeIconVariants}
                    className="origin-center">
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                </motion.button>
              </motion.div>
              <nav className="flex-1 px-6 overflow-y-auto overscroll-none md:block flex flex-col">
                <div className="h-full flex flex-col md:block">
                  <ul
                    className="flex-1 flex flex-col justify-center md:block space-y-6 md:space-y-8 py-4 md:py-8"
                    role="menu">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.label}
                        variants={menuItemVariants}
                        custom={index}
                        style={{ willChange: "transform, opacity" }}
                        role="none"
                        className="group w-full md:w-auto">
                        {item.subItems ? (
                          <div className="flex flex-col items-center md:items-start">
                            <motion.button
                              onClick={() => toggleSubmenu(item.label)}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              variants={buttonHoverVariants}
                              className="w-auto md:w-full text-center md:text-left text-[28px] md:text-[22px] font-medium text-neutral-900 rounded-2xl px-4 py-2.5 transition-colors duration-200 flex items-center justify-center md:justify-between"
                              aria-expanded={activeSubmenu === item.label}
                              role="menuitem">
                              {item.label}
                              <motion.span
                                animate={{
                                  rotate: activeSubmenu === item.label ? 45 : 0,
                                  scale: activeSubmenu === item.label ? 1.1 : 1,
                                }}
                                transition={{
                                  ...smoothTransition,
                                  duration: 0.2,
                                }}
                                className="text-neutral-400 group-hover:text-neutral-600 ml-2 origin-center hidden md:inline-block">
                                +
                              </motion.span>
                            </motion.button>
                            <AnimatePresence mode="wait">
                              {activeSubmenu === item.label && (
                                <motion.ul
                                  initial="closed"
                                  animate="open"
                                  exit="closed"
                                  variants={submenuVariants}
                                  className="mt-6 md:mt-4 md:ml-4 space-y-6 md:space-y-4 w-full flex flex-col items-center md:items-start"
                                  style={{ willChange: "height, opacity" }}
                                  role="menu">
                                  {item.subItems.map((subItem, subIndex) => (
                                    <motion.li
                                      key={subItem.label}
                                      variants={menuItemVariants}
                                      custom={subIndex * 0.03}
                                      style={{
                                        willChange: "transform, opacity",
                                      }}
                                      role="none"
                                      className="w-auto md:w-full">
                                      <motion.div
                                        initial="initial"
                                        whileHover="hover"
                                        whileTap="tap"
                                        variants={buttonHoverVariants}
                                        className="rounded-xl">
                                        <Link
                                          to={subItem.path}
                                          className="block text-[20px] md:text-[17px] text-neutral-600 hover:text-neutral-900 px-4 py-2.5 transition-colors duration-200 text-center md:text-left"
                                          onClick={closeMenu}
                                          role="menuitem">
                                          {subItem.label}
                                        </Link>
                                      </motion.div>
                                    </motion.li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <motion.div
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonHoverVariants}
                            className="rounded-2xl flex justify-center md:justify-start">
                            <Link
                              to={item.path}
                              className="block text-[28px] md:text-[22px] font-medium text-neutral-900 px-4 py-2.5 transition-colors duration-200 text-center md:text-left"
                              onClick={closeMenu}
                              role="menuitem">
                              {item.label}
                            </Link>
                          </motion.div>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </nav>
              <motion.div
                variants={menuItemVariants}
                className="px-6 py-8 md:absolute md:bottom-8 md:left-6 md:right-6 md:py-0 pb-safe"
                style={{ willChange: "transform, opacity" }}>
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    initial: { scale: 1, y: 0 },
                    hover: {
                      scale: 1.02,
                      y: -1,
                      transition: { ...smoothTransition, duration: 0.2 },
                    },
                    tap: {
                      scale: 0.98,
                      y: 1,
                      transition: { ...smoothTransition, duration: 0.1 },
                    },
                  }}
                  className="w-full">
                  <Link
                    to="/book-appointment"
                    className="flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-4 text-[20px] md:text-[17px] font-medium text-white hover:bg-neutral-800 active:bg-neutral-950 transition-all duration-200 shadow-sm"
                    onClick={closeMenu}
                    aria-label="Book an appointment">
                    Book Appointment
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
