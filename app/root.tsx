import { StrictMode, useEffect } from "react";
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

import { TransitionProvider } from "./context/TransitionContext";
import i18next from "./i18n";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { TransitionOverlay } from "./components/Elements/Transition";

import "./global.css";
import "./hooks/fontAwesome";
import { HeaderProvider } from "./context/HeaderContext";
import { useAnalytics } from "./hooks/useAnalytics";

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
  useAnalytics();

  return (
    <I18nextProvider i18n={i18next}>
      <html lang={i18next.language}>
        <head>
          <Meta />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>Singula - Think Metal</title>
          <meta name="title" content="Singula - Think Metal" />
          <meta
            name="description"
            content="A SINGULA cria peças de mobiliário urbano, para jardim e para casa com design arrojado que elevam cada espaço ao nível da elegância."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://singula.pt/" />
          <meta property="og:title" content="Singula - Think Metal" />
          <meta
            property="og:description"
            content="A SINGULA cria peças de mobiliário urbano, para jardim e para casa com design arrojado que elevam cada espaço ao nível da elegância."
          />
          <meta property="og:image" content="https://singula.pt/cover.jpeg" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://singula.pt/cover.jpeg"
          />
          <meta property="twitter:title" content="Singula - Think Metal" />
          <meta
            property="twitter:description"
            content="A SINGULA cria peças de mobiliário urbano, para jardim e para casa com design arrojado que elevam cada espaço ao nível da elegância."
          />
          <meta
            property="twitter:image"
            content="https://singula.pt/cover.jpeg"
          />
          <Meta />
          <Links />
        </head>
        <body>
          <StrictMode>
            <TransitionProvider>
              <HeaderProvider>
                <TransitionOverlay />
                <Header />
                {children}
                <Footer />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
              </HeaderProvider>
            </TransitionProvider>
          </StrictMode>
        </body>
      </html>
    </I18nextProvider>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    interface ContextMenuEvent extends React.MouseEvent {
      preventDefault: () => void;
    }

    const handleContextMenu = (e: MouseEvent) => {
      // prevent the right-click menu from appearing
      e.preventDefault();
    };

    // attach the event listener to
    // the document object
    document.addEventListener("contextmenu", handleContextMenu);

    // clean up the event listener when
    // the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className=""
    >
      <Outlet />
    </motion.div>
  );
}
