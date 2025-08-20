import axios from "axios";

// Determine the API base at runtime to avoid third-party cookie issues in production.
// On Netlify, we proxy requests to the backend so we should use a same-origin relative base.
const isBrowser = typeof window !== "undefined";
const isNetlifyHost = isBrowser && /\.netlify\.app$/.test(window.location.hostname);

export const REMOTE_SERVER = isNetlifyHost
  ? ""
  : (import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000");

export const axiosWithCredentials = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for debugging
axiosWithCredentials.interceptors.request.use(
    (config) => {
        console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
        console.log('Request config:', config);
        if (isBrowser) {
            console.log('Cookies being sent:', document.cookie);
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
axiosWithCredentials.interceptors.response.use(
    (response) => {
        console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        return response;
    },
    (error) => {
        console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
        console.error('Response error:', error.response?.data);
        return Promise.reject(error);
    }
);