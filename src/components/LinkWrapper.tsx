/**
 * LinkWrapper Component
 *
 * A wrapper component for Links that ensures proper scroll behavior when navigating between pages.
 * This component can wrap both native anchor tags and React Router's Link components.
 */

import React, { MouseEvent, forwardRef } from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { enhanceClick } from "../utils/navigation";

type LinkWrapperProps = LinkProps & {
  scrollToTop?: boolean;
  smooth?: boolean;
  external?: boolean;
  className?: string;
};

/**
 * LinkWrapper component that ensures links scroll to top when clicked
 */
export const LinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  (
    {
      to,
      children,
      onClick,
      scrollToTop = true,
      smooth = true,
      external = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    const location = useLocation();

    // Handle click events to scroll to top
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (scrollToTop && !e.defaultPrevented) {
        // Only scroll to top for internal navigation
        if (!external) {
          window.scrollTo({
            top: 0,
            behavior: smooth ? "smooth" : "auto",
          });
        }
      }
    };

    // For external links, use a regular anchor tag
    if (external && typeof to === "string") {
      return (
        <a
          href={to}
          ref={ref}
          onClick={handleClick}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}>
          {children}
        </a>
      );
    }

    // For internal links, use React Router's Link component
    return (
      <Link
        to={to}
        ref={ref}
        onClick={handleClick}
        className={className}
        {...rest}>
        {children}
      </Link>
    );
  }
);

LinkWrapper.displayName = "LinkWrapper";

export default LinkWrapper;
