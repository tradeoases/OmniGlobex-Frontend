import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import "./styles/custom.module.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import RoutesConfig from "./route.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "./service/stripe.ts";

// Initialize the react-query client
const queryClient = new QueryClient();

const stripePromise = getStripe();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Elements  stripe={stripePromise}>
              <RoutesConfig />
            </Elements>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
