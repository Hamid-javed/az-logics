// Auth API
export const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
export const AUTH_API_URL = `${AUTH_API_BASE_URL}/api`;

// Strapi API
export const STRAPI_API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL || process.env.STRAPI_API_BASE_URL;
export const STRAPI_API_URL = `${STRAPI_API_BASE_URL}/api`;
export const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;
