// import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next'; 
// import { useEffect, useState } from 'react'; 
// // import { useGlobalContext } from '../context/GlobalContext'; 

// const TopBanner = () => {
//   const { t, i18n } = useTranslation(); 
//   const { selectedCurrency, setCurrency, selectedLanguage, setLanguage } = useGlobalContext();
//   const [languages, setLanguages] = useState<string[]>([]); 
//   const [currencies, setCurrencies] = useState<string[]>([]); 

//   useEffect(() => {
//     setLanguages(['en', 'es', 'ar', 'de', 'he', 'ko', 'pt', 'zh-Hans', 'zh-Hant']); 
//     setCurrencies(['USD', 'EUR', 'JPY', 'GBP']); 
//   }, []);

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedLang = e.target.value;
//     setLanguage(selectedLang); 
//     i18n.changeLanguage(selectedLang); 
//   };


//   const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setCurrency(e.target.value); 
//   };

//   return (
//     <div className="w-full text-xs border-b py-3">
//       <div className="w-full px-4 md:w-10/12 xl:w-8/12 mx-auto flex items-center justify-between">
//         <div className="flex items-center justify-start gap-4">
//           <Link to="/signup" className="whitespace-nowrap">
//             {t('account')} 
//           </Link>
//           <Link to="/support" className="whitespace-nowrap">
//             {t('support')} 
//           </Link>
//         </div>

    
//         <div className="flex items-center gap-4">
//           <select
//             onChange={handleLanguageChange}
//             value={selectedLanguage}
//             className="border rounded-md p-1"
//           >
//             <option value="">{t('selectLanguage')}</option> 
//             {languages.map((lang) => (
//               <option key={lang} value={lang}>
//                 {t(`languages.${lang}`)} 
//               </option>
//             ))}
//           </select>

          
//           <select
//             onChange={handleCurrencyChange}
//             value={selectedCurrency}
//             className="border rounded-md p-1"
//           >
//             <option value="">{t('selectCurrency')}</option> 
//             {currencies.map((curr) => (
//               <option key={curr} value={curr}>
//                 {curr} 
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopBanner;
