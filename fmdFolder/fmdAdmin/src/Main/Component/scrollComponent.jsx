import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const delay = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(delay);
  }, [pathname]);

  return null;
};

export default ScrollToTop;