"use client";

import { useTheme } from "./context/theme-context";

// Clerk appearance configuration to match the theme with rose accents
export const getClerkAppearance = (theme: "dark" | "light") => ({
  baseTheme: theme,
  variables: {
    colorPrimary: "#f43f5e", // rose-500
    colorText: theme === "dark" ? "white" : "#18181b", // zinc-900 for light mode
    colorTextSecondary: theme === "dark" ? "#a1a1aa" : "#71717a", // zinc-400/500
    colorBackground: theme === "dark" ? "#0a0a0a" : "#ffffff",
    colorInputBackground: theme === "dark" ? "#18181b" : "#f4f4f5", // zinc-900/100
    colorInputText: theme === "dark" ? "white" : "#18181b",
    colorAlphaShade: theme === "dark" ? "#27272a" : "#e4e4e7", // zinc-800/200
    borderRadius: "0.5rem",
  },
  elements: {
    // Card styling
    card: {
      backgroundColor: theme === "dark" ? "#18181b" : "#ffffff", // zinc-900/white
      borderRadius: "0.75rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      border: theme === "dark" ? "1px solid #27272a" : "1px solid #e4e4e7", // zinc-800/200
    },
    // Button styling
    button: {
      fontSize: "0.875rem",
      fontWeight: "500",
      textTransform: "none",
      borderRadius: "0.5rem",
    },
    // Primary button (sign in/up)
    buttonPrimary: {
      backgroundColor: "#f43f5e", // rose-500
      "&:hover": {
        backgroundColor: "#e11d48", // rose-600
      },
    },
    // Secondary button (back, cancel)
    buttonSecondary: {
      backgroundColor: theme === "dark" ? "#27272a" : "#f4f4f5", // zinc-800/100
      border: theme === "dark" ? "1px solid #3f3f46" : "1px solid #d4d4d8", // zinc-700/300
      "&:hover": {
        backgroundColor: theme === "dark" ? "#3f3f46" : "#e4e4e7", // zinc-700/200
      },
    },
    // Form fields
    formFieldInput: {
      borderRadius: "0.5rem",
      border: theme === "dark" ? "1px solid #3f3f46" : "1px solid #d4d4d8", // zinc-700/300
      backgroundColor: theme === "dark" ? "#18181b" : "#ffffff", // zinc-900/white
      "&:focus": {
        borderColor: "#f43f5e", // rose-500
        boxShadow: "0 0 0 1px #f43f5e", // rose-500
      },
    },
    // Footer
    footer: {
      color: theme === "dark" ? "#a1a1aa" : "#71717a", // zinc-400/500
      "& a": {
        color: "#f43f5e", // rose-500
      },
    },
    // Header
    headerTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: theme === "dark" ? "white" : "#18181b",
    },
    headerSubtitle: {
      color: theme === "dark" ? "#a1a1aa" : "#71717a", // zinc-400/500
    },
    // Social buttons
    socialButtonsIconButton: {
      backgroundColor: theme === "dark" ? "#27272a" : "#f4f4f5", // zinc-800/100
      border: theme === "dark" ? "1px solid #3f3f46" : "1px solid #d4d4d8", // zinc-700/300
      color: theme === "dark" ? "white" : "#18181b", // Add this to make text white
      "&:hover": {
        backgroundColor: theme === "dark" ? "#3f3f46" : "#e4e4e7", // zinc-700/200
      },
    },

    // Add specific styling for social buttons text
    socialButtonsBlockButton: {
      backgroundColor: theme === "dark" ? "#27272a" : "#f4f4f5", // zinc-800/100
      border: theme === "dark" ? "1px solid #3f3f46" : "1px solid #d4d4d8", // zinc-700/300
      color: theme === "dark" ? "white" : "#18181b", // Make text white
      "&:hover": {
        backgroundColor: theme === "dark" ? "#3f3f46" : "#e4e4e7", // zinc-700/200
      },
    },

    // Alert
    alert: {
      borderRadius: "0.5rem",
      border: theme === "dark" ? "1px solid #3f3f46" : "1px solid #d4d4d8", // zinc-700/300
    },
    alertText: {
      fontSize: "0.875rem",
    },
    // Divider
    dividerLine: {
      backgroundColor: theme === "dark" ? "#3f3f46" : "#d4d4d8", // zinc-700/300
    },
    dividerText: {
      color: theme === "dark" ? "#a1a1aa" : "#71717a", // zinc-400/500
      fontSize: "0.875rem",
    },
  },
});

// Hook to use with Clerk
export const useClerkAppearance = () => {
  const { theme } = useTheme();
  return getClerkAppearance(theme);
};
