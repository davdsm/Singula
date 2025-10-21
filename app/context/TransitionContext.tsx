import { useLocation } from "@remix-run/react";
import { createContext, useContext, useEffect, useState } from "react";

type TransitionContextType = {
  startTransition: (navigateFn: () => void) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (navigateFn: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigateFn();
    }, 800);
  };

  const location = useLocation();

  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }
  }, [location.pathname]);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error(
      "useTransitionContext must be used within a TransitionProvider"
    );
  }
  return context;
}
