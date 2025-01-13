// import { useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useGlobalContext } from "../context/GlobalContext";
// import Select, { SingleValue } from "react-select";

// // Define the type for the options
// type OptionType = {
//   value: string; // language code
//   label: JSX.Element; // JSX for language name and flag
// };

// const LanguageSelector: React.FC = () => {
//   const { t } = useTranslation();
//   const { languages, selectedLanguage, setLanguage } = useGlobalContext();

  
//   const options = useMemo(() => {
//     return languages.map((lang) => ({
//       value: lang.code, // language code
//       label: (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           {lang.flag && (
//             <img
//               src={lang.flag}
//               alt={`${lang.name} flag`}
//               style={{ width: "24px", height: "16px", marginRight: "8px" }}
//             />
//           )}
//           {lang.name}
//         </div>
//       ),
//     }));
//   }, [languages]);

//   const handleLanguageChange = (
//     newValue: SingleValue<{ value: string; label: JSX.Element }>
//   ) => {
//     if (newValue) {
//       const newLanguage = newValue.value;
//       setLanguage(newLanguage);
//       localStorage.setItem("selectedLanguage", newLanguage);
//     }
//   };

//   return (
//     <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
//       <Select
//         options={options}
//         value={
//           options.find((option) => option.value === selectedLanguage) || null
//         }
//         onChange={handleLanguageChange}
//         aria-label={t("selectLanguage")}
//         styles={{
//           control: (base) => ({
//             ...base,
//             border: "1px solid #ccc",
//             boxShadow: "none",
//             "&:hover": {
//               border: "1px solid #aaa",
//             },
//             minWidth: "120px",
//             maxWidth: "250px",
//             width: "100%",
//           }),
//           menu: (base) => ({
//             ...base,
//             zIndex: 100,
//           }),
//         }}
//       />
//     </div>
//   );
// }

// export default LanguageSelector;
