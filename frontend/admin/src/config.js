// Use environment variable or auto-detect from current hostname
// For VPN/LAN access, set REACT_APP_API_URL=http://<server-ip>:8080 in .env file
// Or it will auto-detect from window.location if available
function getApiUrl() {
  // Priority: 1. Environment variable, 2. Auto-detect from hostname, 3. Default
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
  
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://sing-generator-node.herokuapp.com";
}

const apiUrl = getApiUrl();
const hostApi = process.env.REACT_APP_API_HOST || (process.env.NODE_ENV === "development"
  ? "http://localhost"
  : "https://sing-generator-node.herokuapp.com");
const portApi = process.env.REACT_APP_API_PORT || (process.env.NODE_ENV === "development" ? 8080 : "");
const baseURLApi = apiUrl.includes('/api') ? apiUrl : `${apiUrl}/api`;
const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://flatlogic.github.io/react-material-admin-full";

export default {
  hostApi,
  portApi,
  baseURLApi,
  redirectUrl,
  remote: "https://sing-generator-node.herokuapp.com",
  isBackend: process.env.REACT_APP_BACKEND,
  auth: {
    email: 'admin@flatlogic.com',
    password: 'password',
  },
  app: {
    colors: {
      dark: '#002B49',
      light: '#FFFFFF',
      sea: '#004472',
      sky: '#E9EBEF',
      wave: '#D1E7F6',
      rain: '#CCDDE9',
      middle: '#D7DFE6',
      black: '#13191D',
      salat: '#21AE8C',
    },
  },
};
