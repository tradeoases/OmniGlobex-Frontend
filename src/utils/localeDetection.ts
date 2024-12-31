import axios from 'axios';

export const getLocaleInfo = async () => {
  try {
    const response = await axios.get('https://');
    const { country_code2, languages } = response.data;

    let language = 'en'; // default to english
    if (languages && typeof languages === 'string') {
      language = languages.split(',')[0].split('-')[0].toLowerCase();
    }

    const currency = countryCurrencyMap[country_code2] || 'USD';
    return { currency, language };
  } catch (error) {
    console.error('Error fetching locale info:', error);
    return { currency: 'USD', language: 'en' };
  }
};

const countryCurrencyMap: Record<string, string> = {
  AE: 'AED', SA: 'SAR', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR',
  EG: 'EGP', JO: 'JOD', LB: 'LBP', IQ: 'IQD', IR: 'IRR', IL: 'ILS', TR: 'TRY',
  SY: 'SYP', YE: 'YER', PS: 'ILS',

  ZA: 'ZAR', NG: 'NGN', KE: 'KES', UG: 'UGX', DZ: 'DZD', MA: 'MAD',
  TN: 'TND', GH: 'GHS', CI: 'XOF', CM: 'XAF', SN: 'XOF', TZ: 'TZS', ET: 'ETB',
  LY: 'LYD', AO: 'AOA', ZM: 'ZMW', ZW: 'ZWL', RW: 'RWF', MZ: 'MZN', NA: 'NAD',
  BW: 'BWP', MU: 'MUR', SD: 'SDG', SS: 'SSP',

  GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', CH: 'CHF',
  SE: 'SEK', NO: 'NOK', DK: 'DKK', FI: 'EUR', PL: 'PLN', RU: 'RUB', UA: 'UAH',
  CZ: 'CZK', AT: 'EUR', BE: 'EUR', IE: 'EUR', PT: 'EUR', GR: 'EUR', HU: 'HUF',

  US: 'USD', CA: 'CAD', MX: 'MXN',

  PA: 'PAB', CR: 'CRC', NI: 'NIO', HN: 'HNL', SV: 'USD', GT: 'GTQ', BZ: 'BZD',
  DO: 'DOP', CU: 'CUP', JM: 'JMD', HT: 'HTG', BS: 'BSD', BB: 'BBD',

  BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', EC: 'USD', UY: 'UYU',
  PY: 'PYG', BO: 'BOB', VE: 'VES',

  JP: 'JPY', CN: 'CNY', IN: 'INR', KR: 'KRW', SG: 'SGD', ID: 'IDR', MY: 'MYR',
  TH: 'THB', VN: 'VND', PH: 'PHP', PK: 'PKR',

  AU: 'AUD', NZ: 'NZD',
};
