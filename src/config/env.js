// Environment configuration with type safety
export const config = {
  // Analytics
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
    plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || '',
    enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },

  // Error Tracking
  sentry: {
    dsn: import.meta.env.VITE_SENTRY_DSN || '',
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development',
    enabled: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  },

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  },

  // Feature Flags
  features: {
    cloudSave: import.meta.env.VITE_ENABLE_CLOUD_SAVE === 'true',
    premium: import.meta.env.VITE_ENABLE_PREMIUM_FEATURES === 'true',
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Wedding Card Designer',
    url: import.meta.env.VITE_APP_URL || 'https://wedding-card-designer.vercel.app',
    supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@wedding-card-designer.com',
    version: import.meta.env.VITE_BUILD_VERSION || '1.0.0',
    buildDate: import.meta.env.VITE_BUILD_DATE || new Date().toISOString(),
  },

  // Storage Configuration
  storage: {
    maxImageSize: parseInt(import.meta.env.VITE_MAX_IMAGE_SIZE || '5242880'), // 5MB
    maxUploadSize: parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE || '10485760'), // 10MB
  },

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
}

// Helper function to check if analytics should be initialized
export const shouldInitAnalytics = () => {
  return config.analytics.enabled && (config.analytics.gaId || config.analytics.plausibleDomain)
}

// Helper function to check if error tracking should be initialized
export const shouldInitErrorTracking = () => {
  return config.sentry.enabled && config.sentry.dsn
}

export default config
