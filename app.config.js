// Load environment variables if .env exists
try {
  require('dotenv').config();
} catch (e) {
  // .env file doesn't exist, continue without it
}

module.exports = {
  expo: {
    name: process.env.APP_NAME || 'Restate',
    slug: process.env.APP_SLUG || 'Restate',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
      appEnv: process.env.APP_ENV || 'development',
    },
  },
};

