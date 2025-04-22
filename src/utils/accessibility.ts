/**
 * Accessibility Utilities
 *
 * This module provides utilities for improving accessibility in the application.
 * It includes functions for managing focus, ARIA attributes, and keyboard navigation.
 */

import React from "react";

/**
 * Manages focus trapping for modal dialogs or similar elements.
 * Adds keyboard listener to trap focus when shouldFocus is true.
 * The calling component is responsible for removing the listener when appropriate.
 * @param element - The element to trap focus within.
 * @param shouldFocus - Whether focus trapping should be active.
 */
export const manageFocus = (
  element: HTMLElement | null,
  shouldFocus: boolean
): void => {
  if (!element) return;

  // Define the keydown handler function *outside* the condition
  // so it can be potentially referenced for removal if needed, although
  // the responsibility is shifted to the caller.
  const handleTabKey = (e: KeyboardEvent) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement?.focus();
        }
      }
    }
  };

  if (shouldFocus) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0] as HTMLElement;

    // Focus the first element when focus management is activated
    firstFocusableElement?.focus();

    // Add event listener for tab key
    element.addEventListener("keydown", handleTabKey);
    // NOTE: The removal of this listener should be handled by the calling component's useEffect cleanup

    // Removed the attempt to return a cleanup function
    // return () => {
    //   element.removeEventListener("keydown", handleTabKey);
    // };
  } else {
    // Optionally, you could remove the listener here if the element persists,
    // but it's generally cleaner to handle in the calling component's effect cleanup.
    // element.removeEventListener("keydown", handleTabKey);
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
