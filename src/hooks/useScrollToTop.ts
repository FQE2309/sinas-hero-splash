import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll suave al inicio cuando cambias de ruta
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
};