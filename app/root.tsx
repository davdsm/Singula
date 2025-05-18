import { motion } from "framer-motion";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { I18nextProvider } from "react-i18next";

import {
  TransitionProvider,
  useTransitionContext,
} from "./context/TransitionContext";
import i18next from "./i18n";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { TransitionOverlay } from "./components/Elements/Transition";

import "./global.css";
import "./hooks/fontAwesome";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "favicon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18next}>
      <html lang={i18next.language}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>Singula - Design que se vê, Design que se sente.</title>
          <meta
            name="title"
            content="Singula - Design que se vê, Design que se sente."
          />
          <meta
            name="description"
            content="Na Singula, o metal ganha alma. E o design ganha ousadia.Seja no meio da cidade, num jardim ou à porta de casa. Desenhamos cada linha como se fosse um guião. Mas sem finais previsíveis.Só entradas de impacto e formas com destino."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://singula.pt/" />
          <meta
            property="og:title"
            content="Singula - Design que se vê, Design que se sente."
          />
          <meta
            property="og:description"
            content="Na Singula, o metal ganha alma. E o design ganha ousadia.Seja no meio da cidade, num jardim ou à porta de casa. Desenhamos cada linha como se fosse um guião. Mas sem finais previsíveis.Só entradas de impacto e formas com destino."
          />
          <meta property="og:image" content="./cover.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="./cover.png" />
          <meta
            property="twitter:title"
            content="Singula - Design que se vê, Design que se sente."
          />
          <meta
            property="twitter:description"
            content="Na Singula, o metal ganha alma. E o design ganha ousadia.Seja no meio da cidade, num jardim ou à porta de casa. Desenhamos cada linha como se fosse um guião. Mas sem finais previsíveis.Só entradas de impacto e formas com destino."
          />
          <meta property="twitter:image" content="./cover.png" />
          <Meta />
          <Links />
        </head>
        <body>
          <TransitionProvider>
            <TransitionOverlay />
            <Header />
            {children}
            <Footer />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </TransitionProvider>
        </body>
      </html>
    </I18nextProvider>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Outlet />
    </motion.div>
  );
}
