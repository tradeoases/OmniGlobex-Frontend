// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
// import { useTranslation } from 'react-i18next';
// import { fetchCurrencies } from '../utils/api';
// import { getLocaleInfo } from '../utils/localeDetection';
// import axios from 'axios';
// import { useRecoilState } from 'recoil';

// // Types
// interface CurrencyRates {
//   [key: string]: number;
// }

// interface Language {
//   code: string;
//   name: string;
//   nativeName: string;
//   flag: string;
// }

// interface GlobalContextType {
//   selectedCurrency: string;
//   setCurrency: (currency: string) => void;
//   selectedLanguage: string;
//   setLanguage: (language: string) => void;
//   currencies: CurrencyRates;
//   languages: Language[];
// }

// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// export const useGlobalContext = () => {
//   const context = useContext(GlobalContext);
//   if (!context) {
//     throw new Error("useGlobalContext must be used within a GlobalProvider");
//   }
//   return context;
// };

// // GlobalProvider component
// export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const { i18n } = useTranslation();
//   // const [selectedCurrency, setSelectedCurrency] = useRecoilState(currencyAtom);
//   // const [selectedLanguage, setSelectedLanguage] = useRecoilState(languageAtom);
//   // const [currencies, setCurrencies] = useState<CurrencyRates>({});

//   // const availableLanguages = Object.keys(languages);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         // Get locale info (currency and language)
//         const { currency, language } = await getLocaleInfo();
//         setSelectedCurrency(currency);
//         setSelectedLanguage(language);

//         // Initialize language with i18n
//         if (i18n.isInitialized) {
//           i18n.changeLanguage(language);
//         } else {
//           i18n.on('initialized', () => i18n.changeLanguage(language));
//         }

//         // Fetch available currencies
//         const availableCurrencies = await fetchCurrencies();
//         if (availableCurrencies) {
//           setCurrencies(availableCurrencies);
//         }
//       } catch (error) {
//         console.error("Error during initialization:", error);
//       }
//     };

//     init();
//   }, [i18n]);

//   const handleLanguageChange = (language: string) => {
//     setSelectedLanguage(language);
//     localStorage.setItem("selectedLanguage", language);
//     i18n.changeLanguage(language);
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         selectedCurrency,
//         setCurrency: setSelectedCurrency,
//         selectedLanguage,
//         setLanguage: handleLanguageChange,
//         currencies,
//         languages: supportedLanguages,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
