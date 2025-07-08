import { getCurrencyByCode } from './currencies';

export const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
  const currency = getCurrencyByCode(currencyCode);
  if (!currency) return `${amount.toFixed(2)}`;
  
  // Use Intl.NumberFormat for proper currency formatting
  try {
    // Try to get the locale for the currency, fallback to en-US
    const locale = getLocaleForCurrency(currencyCode);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currency.decimals,
      maximumFractionDigits: currency.decimals,
    }).format(amount);
  } catch (error) {
    // Fallback to manual formatting if Intl.NumberFormat fails
    return `${currency.symbol}${amount.toFixed(currency.decimals)}`;
  }
};

const getLocaleForCurrency = (currencyCode: string): string => {
  const currencyLocaleMap: { [key: string]: string } = {
    'USD': 'en-US',
    'EUR': 'de-DE',
    'GBP': 'en-GB',
    'JPY': 'ja-JP',
    'CNY': 'zh-CN',
    'INR': 'en-IN',
    'AUD': 'en-AU',
    'CAD': 'en-CA',
    'CHF': 'de-CH',
    'SEK': 'sv-SE',
    'NOK': 'nb-NO',
    'DKK': 'da-DK',
    'PLN': 'pl-PL',
    'CZK': 'cs-CZ',
    'HUF': 'hu-HU',
    'RUB': 'ru-RU',
    'BRL': 'pt-BR',
    'MXN': 'es-MX',
    'KRW': 'ko-KR',
    'SGD': 'en-SG',
    'HKD': 'zh-HK',
    'NZD': 'en-NZ',
    'ZAR': 'en-ZA',
    'TRY': 'tr-TR',
    'THB': 'th-TH',
    'MYR': 'ms-MY',
    'PHP': 'en-PH',
    'IDR': 'id-ID',
    'VND': 'vi-VN',
  };
  
  return currencyLocaleMap[currencyCode] || 'en-US';
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatDate = (date: string | Date, locale: string = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
};

export const formatDateTime = (date: string | Date, locale: string = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};