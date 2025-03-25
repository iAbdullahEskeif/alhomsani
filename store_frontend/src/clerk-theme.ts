// Clerk appearance configuration to match the dark theme with rose accents
export const clerkAppearance = {
  baseTheme: "dark",
  variables: {
    colorPrimary: "#f43f5e", // rose-500
    colorText: "white",
    colorTextSecondary: "#a1a1aa", // zinc-400
    colorBackground: "#0a0a0a",
    colorInputBackground: "#18181b", // zinc-900
    colorInputText: "white",
    colorAlphaShade: "#27272a", // zinc-800
    borderRadius: "0.5rem",
  },
  elements: {
    // Card styling
    card: {
      backgroundColor: "#18181b", // zinc-900
      borderRadius: "0.75rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      border: "1px solid #27272a", // zinc-800
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
      backgroundColor: "#27272a", // zinc-800
      border: "1px solid #3f3f46", // zinc-700
      "&:hover": {
        backgroundColor: "#3f3f46", // zinc-700
      },
    },
    // Form fields
    formFieldInput: {
      borderRadius: "0.5rem",
      border: "1px solid #3f3f46", // zinc-700
      backgroundColor: "#18181b", // zinc-900
      "&:focus": {
        borderColor: "#f43f5e", // rose-500
        boxShadow: "0 0 0 1px #f43f5e", // rose-500
      },
    },
    // Footer
    footer: {
      color: "#a1a1aa", // zinc-400
      "& a": {
        color: "#f43f5e", // rose-500
      },
    },
    // Header
    headerTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    headerSubtitle: {
      color: "#a1a1aa", // zinc-400
    },
    // Social buttons
    socialButtonsIconButton: {
      backgroundColor: "#27272a", // zinc-800
      border: "1px solid #3f3f46", // zinc-700
      color: "white", // Add this to make text white
      "&:hover": {
        backgroundColor: "#3f3f46", // zinc-700
      },
    },

    // Add specific styling for social buttons text
    socialButtonsBlockButton: {
      backgroundColor: "#27272a", // zinc-800
      border: "1px solid #3f3f46", // zinc-700
      color: "white", // Make text white
      "&:hover": {
        backgroundColor: "#3f3f46", // zinc-700
      },
    },

    // Alert
    alert: {
      borderRadius: "0.5rem",
      border: "1px solid #3f3f46", // zinc-700
    },
    alertText: {
      fontSize: "0.875rem",
    },
    // Divider
    dividerLine: {
      backgroundColor: "#3f3f46", // zinc-700
    },
    dividerText: {
      color: "#a1a1aa", // zinc-400
      fontSize: "0.875rem",
    },
  },
};
