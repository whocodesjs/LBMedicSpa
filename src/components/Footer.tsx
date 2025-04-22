/**
 * Footer Component
 *
 * A responsive footer component that includes:
 * - Contact information
 * - Social media links
 * - Quick navigation links
 * - Copyright information
 * - Smooth animations using Framer Motion
 *
 * @component
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Square2StackIcon as FacebookIcon,
  PhotoIcon as InstagramIcon,
  BoltIcon as TwitterIcon,
  LinkIcon as LinkedInIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

/**
 * Interface for social media links
 */
interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/**
 * Interface for footer link groups
 */
interface FooterLinkGroup {
  title: string;
  links: Array<{
    name: string;
    href: string;
  }>;
}

/**
 * Social media links configuration
 */
const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: TwitterIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedInIcon,
  },
];

/**
 * Footer navigation links configuration
 */
const footerLinks: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { name: "Services", href: "/services" },
      { name: "Book Appointment", href: "/book-appointment" },
      { name: "Events", href: "/events" },
      { name: "Blog", href: "/blog" },
    ],
  },
];

/**
 * Animation variants for the container
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Animation variants for individual items
 */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

/**
 * Animation variants for links
 */
const linkVariants = {
  initial: {
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: "16px",
  },
  hover: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Animation variants for social icons
 */
const socialIconVariants = {
  initial: {
    opacity: 0.7,
    scale: 1,
  },
  hover: {
    opacity: 1,
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

/**
 * Footer Component
 *
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer: React.FC = () => {
  // Memoize the current year to prevent unnecessary re-renders
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="mt-auto bg-white/95" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-3">
          {/* Brand and Contact */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Link to="/" className="inline-block" aria-label="Home">
              <span className="text-2xl font-normal text-neutral-900">
                LB Medical Spa
              </span>
            </Link>

            <div className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPinIcon
                      className="h-5 w-5 text-neutral-400 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Location
                      </h3>
                      <address className="text-sm leading-relaxed text-neutral-600 not-italic">
                        <p>2-6 South Avenue Road</p>
                        <p>Shop #6, Lane Plaza</p>
                        <p>Kingston, Jamaica</p>
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneIcon
                      className="h-5 w-5 text-neutral-400 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+18768225525"
                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        (876) 822-5525
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <EnvelopeIcon
                      className="h-5 w-5 text-neutral-400 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:drsummermgraham@gmail.com"
                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        drsummermgraham@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        variants={socialIconVariants}
                        initial="initial"
                        whileHover="hover"
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit our ${item.name} page`}>
                        <span className="sr-only">{item.name}</span>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {footerLinks.map((group) => (
                <div key={group.title} className="space-y-6">
                  <h3 className="text-base font-normal text-neutral-900 px-4">
                    {group.title}
                  </h3>
                  <ul role="list" className="space-y-1">
                    {group.links.map((item) => (
                      <motion.li key={item.name}>
                        <motion.div
                          variants={linkVariants}
                          initial="initial"
                          whileHover="hover"
                          className="px-4 py-2.5">
                          <Link
                            to={item.href}
                            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200 block">
                            {item.name}
                          </Link>
                        </motion.div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-neutral-200">
          <p className="text-sm text-center text-neutral-500">
            © {currentYear} LB Medical Spa. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
