import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return isMobile;
};
