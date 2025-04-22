/**
 * Main Entry Point
 *
 * This is the main entry point of the application that:
 * - Initializes React
 * - Sets up the root DOM element
 * - Renders the main App component
 *
 * @module Main
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Get the root element
const rootElement = document.getElementById("root");

// Check if root element exists
if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Make sure there's a div with id 'root' in your index.html"
  );
}

// Create root and render app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
