
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import "./styles/custom.module.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import AppLayout from "./components/app-layout.tsx";
import RoutesConfig from "./route.tsx";
import React from "react";
import { GlobalProvider } from './context/GlobalContext';
import './i18n';  
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <GlobalProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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
