import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, atom, useSetRecoilState } from "recoil"; 
import "./index.css";
import "./styles/custom.module.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import AppLayout from "./components/app-layout.tsx";
import RoutesConfig from "./route.tsx";
import { GlobalProvider } from "./context/GlobalContext";
import "./i18n"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getLocaleInfo } from "./utils/localeDetection"; 


const currencyState = atom({
  key: 'currencyState', 
  default: 'USD', 
});

const languageState = atom({
  key: 'languageState',
  default: 'en',
});

const queryClient = new QueryClient();

const AppInitializer: React.FC = () => {
  const setCurrency = useSetRecoilState(currencyState);
  const setLanguage = useSetRecoilState(languageState);

  useEffect(() => {
    const fetchLocale = async () => {
      const { currency, language } = await getLocaleInfo();
      setCurrency(currency);
      setLanguage(language);
    };

    fetchLocale();
  }, [setCurrency, setLanguage]);

  return null; 
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <AppInitializer />
              <AppLayout>
                <RoutesConfig />
              </AppLayout>
            </ThemeProvider>
          </GlobalProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
