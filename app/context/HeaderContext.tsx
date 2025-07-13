import { useLocation } from "@remix-run/react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type HeaderContextType = {
  delayMenu: boolean;
  setDelayMenu: (value: boolean) => void;
  showHeader: boolean;
  setShowHeader: (value: boolean) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  let currentRoute = location.pathname.trim().split("/");
  currentRoute.shift();
  currentRoute = currentRoute.filter((path) => path !== "")

  const [delayMenu, setDelayMenu] = useState(
    currentRoute.find((path) => path === "products") ? true : false
  );
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {    
    if (currentRoute.find((path) => path === "products")) {
      setShowHeader(false);
      setTimeout(() => {
        setDelayMenu(true);
        setShowHeader(true);
      }, 50);
    }
  }, [location]);

  return (
    <HeaderContext.Provider
      value={{
        delayMenu,
        setDelayMenu,
        showHeader,
        setShowHeader,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("useHeader must be used within HeaderProvider");
  return context;
};
