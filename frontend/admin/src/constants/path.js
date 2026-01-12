// Use environment variable or auto-detect from current hostname
// For VPN/LAN access, set REACT_APP_API_URL=http://<server-ip>:8080 in .env file
// Or it will auto-detect from window.location if available
function getApiUrl() {
  // Priority: 1. Environment variable, 2. Auto-detect from hostname, 3. Default localhost
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Auto-detect from current hostname (works for VPN/LAN access)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If not localhost, use the same hostname for API
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `http://${hostname}:8080`;
    }
  }
  
  return 'http://localhost:8080';
}

export const API_URL = getApiUrl();
