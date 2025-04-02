import React from "react";
import { Link } from "react-router-dom";
import {
  Square2StackIcon as FacebookIcon,
  PhotoIcon as InstagramIcon,
  BoltIcon as TwitterIcon,
  LinkIcon as LinkedInIcon,
} from "@heroicons/react/24/outline";

const socialLinks = [
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

const footerLinks = [
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

export default function Footer() {
  return (
    <footer className="bg-gradient-glass border-t border-gray-200/50 backdrop-blur-md mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand and Contact */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group">
              <span className="text-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300">
                MedicSpa
              </span>
            </Link>
            <div className="footer-contact">
              <p>123 Wellness Street</p>
              <p>New York, NY 10001</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@medicspa.com</p>
            </div>
            <div className="flex space-x-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="footer-heading">{group.title}</h3>
                <ul role="list" className="space-y-4">
                  {group.links.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="footer-link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-200/50">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} MedicSpa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
