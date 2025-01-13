import axios from 'axios';

export const fetchCurrencies = async () => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return null;
  }
};