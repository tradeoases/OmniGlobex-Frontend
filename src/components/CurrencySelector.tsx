import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import Select, { SingleValue } from 'react-select';

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currencies, selectedCurrency, setCurrency } = useGlobalContext(); 

  
  const options = useMemo(() => {
    return Object.keys(currencies).map(currencyCode => ({
      value: currencyCode,
      label: currencyCode.toUpperCase(), 
    }));
  }, [currencies]);

  const handleCurrencyChange = (newValue: SingleValue<{ value: string; label: string }>) => {
    
    if (newValue) {
      const newCurrency = newValue.value;
      setCurrency(newCurrency);
      localStorage.setItem('selectedCurrency', newCurrency);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Select
        options={options}
        value={options.find(option => option.value === selectedCurrency) || null} 
        onChange={handleCurrencyChange}
        aria-label={t('selectCurrency')}
        styles={{
          control: (base) => ({
            ...base,
            border: '1px solid #ccc',
            boxShadow: 'none',
            '&:hover': {
              border: '1px solid #aaa',
            },
            minWidth: '120px', // Minimum width for the dropdown
            maxWidth: '250px', // Maximum width to prevent overflow
            width: '100%', // Make it responsive
          }),
          menu: (base) => ({
            ...base,
            zIndex: 100, // Make sure the dropdown is on top
          }),
        }}
      />
    </div>
  );
};

export default CurrencySelector;
