// Utility functions for JWT authentication

// Store tokens in localStorage
export const storeTokens = (tokens) => {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
  localStorage.setItem("token_expiry", calculateExpiry());
};

// Calculate token expiry (default 15 minutes from now)
const calculateExpiry = () => {
  return Date.now() + 15 * 60 * 1000; // 15 minutes in milliseconds
};

// Get stored tokens
export const getTokens = () => {
  return {
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
    expiry: localStorage.getItem("token_expiry"),
  };
};

// Check if access token is expired
export const isTokenExpired = () => {
  const expiry = localStorage.getItem("token_expiry");
  if (!expiry) return true;
  return Date.now() > Number.parseInt(expiry);
};

// Clear tokens on logout
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_expiry");
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();

    // Update only the access token and expiry
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("token_expiry", calculateExpiry());

    return data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    clearTokens(); // Clear tokens if refresh fails
    return null;
  }
};

// Make authenticated API requests with automatic token refresh
export const authFetch = async (url, options = {}) => {
  // Check if token is expired and refresh if needed
  if (isTokenExpired()) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      throw new Error("Authentication expired. Please login again.");
    }
  }

  // Get the current access token
  const accessToken = localStorage.getItem("access_token");

  // Set up headers with authorization
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  // Make the authenticated request
  return fetch(url, {
    ...options,
    headers,
  });
};
