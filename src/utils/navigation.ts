/**
 * Navigation Utilities
 *
 * This module provides utilities for improving navigation in the application.
 * It includes functions for handling link clicks, scroll behavior, and route transitions.
 */

import { MouseEvent } from "react";
import { NavigateOptions } from "react-router-dom";

/**
 * Enhances a link click to ensure proper scroll behavior
 * @param onClick - The original onClick handler (optional)
 * @param options - Navigation options
 * @returns A new click handler with enhanced scroll behavior
 */
export const enhanceClick = (
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void,
  options: NavigateOptions = {}
) => {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // If it's an internal link (not external), scroll to top
    if (
      !e.defaultPrevented && // The original handler didn't prevent default
      !e.currentTarget.getAttribute("target") && // No target attribute (like _blank)
      !e.currentTarget.getAttribute("href")?.startsWith("http") // Not an external URL
    ) {
      // Scroll to top with smooth behavior for better UX
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
};

/**
 * Transforms all anchor elements in a component to ensure they scroll to top
 * @param ref - The reference to the component containing anchor elements
 */
export const enhanceAnchors = (ref: React.RefObject<HTMLElement>) => {
  if (!ref.current) return;

  // Find all anchor elements
  const anchors = ref.current.querySelectorAll("a");

  // Add click event to each anchor
  anchors.forEach((anchor) => {
    // Skip if it already has our handler
    if (anchor.dataset.scrollEnhanced) return;

    // Mark as enhanced
    anchor.dataset.scrollEnhanced = "true";

    // Add click handler
    anchor.addEventListener("click", (e) => {
      // Only handle internal links
      if (
        !anchor.getAttribute("target") &&
        !anchor.getAttribute("href")?.startsWith("http") &&
        !anchor.getAttribute("href")?.startsWith("mailto:") &&
        !anchor.getAttribute("href")?.startsWith("tel:")
      ) {
        // Scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  });
};

/**
 * Scrolls to a specific element on the page
 * @param elementId - The ID of the element to scroll to
 * @param offset - The offset from the top (useful for fixed headers)
 */
export const scrollToElement = (elementId: string, offset = 0) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

/**
 * Restores the scroll position when navigating back
 * @param key - The navigation key (from location.key)
 */
export const restoreScrollPosition = (key: string) => {
  // Try to get saved position from session storage
  const savedPosition = sessionStorage.getItem(`scroll_${key}`);
  if (savedPosition) {
    window.scrollTo({
      top: parseInt(savedPosition, 10),
      behavior: "auto",
    });
  } else {
    window.scrollTo(0, 0);
  }
};

/**
 * Saves the current scroll position for back navigation
 * @param key - The navigation key (from location.key)
 */
export const saveScrollPosition = (key: string) => {
  sessionStorage.setItem(`scroll_${key}`, String(window.scrollY));
};
