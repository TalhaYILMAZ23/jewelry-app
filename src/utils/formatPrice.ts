/**
 * Fiyatı USD formatında gösterir
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Fiyatı kompakt formatda gösterir (örn: $1.2K, $1.5M)
 */
export const formatPriceCompact = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(price);
};

/**
 * Sadece sayısal değeri formatlar (para birimi olmadan)
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

/**
 * Yüzde formatında gösterir
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

/**
 * Ağırlığı formatlar
 */
export const formatWeight = (weight: number): string => {
  return `${weight}g`;
};

/**
 * Rating'i formatlar
 */
export const formatRating = (rating: number, maxRating: number = 5): string => {
  return `${rating.toFixed(1)}/${maxRating}`;
};
