/**
 * Accessibility Utilities
 *
 * This module provides utilities for improving accessibility in the application.
 * It includes functions for managing focus, ARIA attributes, and keyboard navigation.
 */

import React from "react";

/**
 * Manages focus for modal dialogs
 * @param element - The modal element
 * @param shouldFocus - Whether to focus the element
 */
export const manageFocus = (
  element: HTMLElement | null,
  shouldFocus: boolean
): void => {
  if (!element) return;

  if (shouldFocus) {
    // Find all focusable elements
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // Store the first and last focusable elements
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Focus the first element
    firstFocusableElement?.focus();

    // Add event listener for tab key
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // If shift + tab and on first element, move to last
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement?.focus();
          }
        } else {
          // If tab and on last element, move to first
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement?.focus();
          }
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);

    // Cleanup
    return () => {
      element.removeEventListener("keydown", handleTabKey);
    };
  }
};

/**
 * Generates ARIA attributes for a component
 * @param props - The component props
 * @returns An object with ARIA attributes
 */
export const generateAriaAttributes = (props: {
  label?: string;
  description?: string;
  expanded?: boolean;
  pressed?: boolean;
  selected?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
}): Record<string, string | boolean> => {
  const attributes: Record<string, string | boolean> = {};

  if (props.label) {
    attributes["aria-label"] = props.label;
  }

  if (props.description) {
    attributes["aria-describedby"] = props.description;
  }

  if (typeof props.expanded === "boolean") {
    attributes["aria-expanded"] = props.expanded;
  }

  if (typeof props.pressed === "boolean") {
    attributes["aria-pressed"] = props.pressed;
  }

  if (typeof props.selected === "boolean") {
    attributes["aria-selected"] = props.selected;
  }

  if (typeof props.disabled === "boolean") {
    attributes["aria-disabled"] = props.disabled;
  }

  if (typeof props.required === "boolean") {
    attributes["aria-required"] = props.required;
  }

  if (typeof props.invalid === "boolean") {
    attributes["aria-invalid"] = props.invalid;
  }

  return attributes;
};

/**
 * Handles keyboard navigation for a list of items
 * @param items - The list of items
 * @param onSelect - The callback when an item is selected
 * @returns An object with keyboard event handlers
 */
export const handleKeyboardNavigation = <T>(
  items: T[],
  onSelect: (item: T) => void
): {
  onKeyDown: (e: React.KeyboardEvent) => void;
} => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = items.findIndex(
      (item) =>
        document.activeElement?.getAttribute("data-item-id") === String(item)
    );

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          onSelect(items[currentIndex + 1]);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          onSelect(items[currentIndex - 1]);
        }
        break;
      case "Home":
        e.preventDefault();
        onSelect(items[0]);
        break;
      case "End":
        e.preventDefault();
        onSelect(items[items.length - 1]);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (currentIndex !== -1) {
          onSelect(items[currentIndex]);
        }
        break;
    }
  };

  return { onKeyDown };
};

/**
 * Generates a unique ID for an element
 * @param prefix - The prefix for the ID
 * @returns A unique ID
 */
export const generateUniqueId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};
