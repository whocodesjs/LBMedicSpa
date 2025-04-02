import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

interface MenuItem {
  label: string;
  path: string;
  subItems?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    path: "/services",
    subItems: [
      { label: "Massage Therapy", path: "/services" },
      { label: "Facial Treatments", path: "/services" },
      { label: "Body Treatments", path: "/services" },
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : ""
        }`}
        style={{ zIndex: 1000 }}>
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-medium">
              MedicSpa
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/book-appointment"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105">
                Book Appointment
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 p-2 text-neutral-900 hover:bg-neutral-50 transition-all duration-300">
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
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 bottom-0 right-0 w-[50vw] bg-white/95 backdrop-blur-md overflow-hidden"
              style={{ zIndex: 1002 }}>
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-end gap-4 p-4">
                  <Link
                    to="/book-appointment"
                    onClick={() => setIsOpen(false)}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105">
                    <span>Book Appointment</span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </motion.svg>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-all duration-300">
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
                              className="flex w-full items-center justify-between text-2xl font-medium tracking-tight text-neutral-900 hover:text-neutral-600 transition-all duration-300">
                              {item.label}
                              <motion.span
                                animate={{
                                  rotate: activeSubmenu === item.label ? 45 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="text-xl">
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
                                        onClick={() => setIsOpen(false)}
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
                            onClick={() => setIsOpen(false)}
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
