// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Color Configuration
export const COLORS = {
  YELLOW_GOLD: '#E6CA97',
  WHITE_GOLD: '#D9D9D9',
  ROSE_GOLD: '#E1A4A9',
} as const;

// Product Configuration
export const PRODUCT_CONFIG = {
  ITEMS_PER_PAGE: 4,
  MAX_RATING: 5,
  DEFAULT_CURRENCY: 'USD',
  GOLD_PRICE_UPDATE_INTERVAL: 5 * 60 * 1000, // 5 dakika
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  TOAST_DURATION: 3000,
} as const;

// Filter Configuration
export const FILTER_CONFIG = {
  PRICE_RANGE: {
    MIN: 0,
    MAX: 10000,
    STEP: 100,
  },
  POPULARITY_RANGE: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
  },
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE_DESKTOP: '1200px',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
  SERVER_ERROR: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  NOT_FOUND: 'Aradığınız sayfa bulunamadı.',
  PRODUCTS_LOAD_ERROR: 'Ürünler yüklenirken hata oluştu.',
  GOLD_PRICE_ERROR: 'Altın fiyatı alınırken hata oluştu.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCTS_LOADED: 'Ürünler başarıyla yüklendi.',
  GOLD_PRICE_UPDATED: 'Altın fiyatı güncellendi.',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  GOLD_PRICE_CACHE: 'goldPriceCache',
  USER_PREFERENCES: 'userPreferences',
  CART_ITEMS: 'cartItems',
} as const;
