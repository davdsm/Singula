import { useLocation } from "@remix-run/react";
import { useEffect } from "react";

export const useUrlParams = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash && hash.length > 0) {
      setTimeout(() => {
        const elem = document.getElementById(hash.replace("#", ""));
        elem?.scrollIntoView();
      }, 500);
    }
  }, [hash]);
};
