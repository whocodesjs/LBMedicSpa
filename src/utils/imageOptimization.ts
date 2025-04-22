/**
 * Image Optimization Utilities
 *
 * This module provides utilities for optimizing images in the application.
 * It includes functions for lazy loading, responsive images, and image optimization.
 */

import React from "react";

/**
 * Generates a responsive image srcset string
 * @param src - The base image source
 * @param sizes - Array of sizes in pixels
 * @returns A srcset string for responsive images
 */
export const generateSrcSet = (src: string, sizes: number[]): string => {
  return sizes.map((size) => `${src}?w=${size} ${size}w`).join(", ");
};

/**
 * Generates a responsive image sizes attribute
 * @param breakpoints - Array of breakpoint objects with minWidth and size
 * @returns A sizes string for responsive images
 */
export const generateSizes = (
  breakpoints: Array<{ minWidth: number; size: string }>
): string => {
  return breakpoints
    .map(({ minWidth, size }) => `(min-width: ${minWidth}px) ${size}`)
    .join(", ");
};

/**
 * Lazy loads an image with a placeholder
 * @param src - The image source
 * @param placeholder - The placeholder image source
 * @returns An object with the image source and loading state
 */
export const lazyLoadImage = (
  src: string,
  placeholder: string
): { src: string; loading: boolean } => {
  const [imageSrc, setImageSrc] = React.useState(placeholder);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };
  }, [src]);

  return { src: imageSrc, loading };
};

/**
 * Optimizes an image URL for better performance
 * @param src - The image source
 * @param options - Optimization options
 * @returns An optimized image URL
 */
export const optimizeImage = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpeg" | "png";
  } = {}
): string => {
  const { width, height, quality = 80, format = "webp" } = options;
  const params = new URLSearchParams();

  if (width) params.append("w", width.toString());
  if (height) params.append("h", height.toString());
  params.append("q", quality.toString());
  params.append("fm", format);

  return `${src}?${params.toString()}`;
};
