import { useEffect, useState } from 'react';

//getted from https://tailwindcss.com/docs/screens
const screens = {
  sm: '640px',
  // => @media (min-width: 640px) { ... }

  md: '768px',
  // => @media (min-width: 768px) { ... }

  lg: '1024px',
  // => @media (min-width: 1024px) { ... }

  xl: '1280px',
  // => @media (min-width: 1280px) { ... }

  '2xl': '1536px',
  // => @media (min-width: 1536px) { ... }
};

//getted from https://gist.github.com/SimeonGriggs/7071958b8a629faf9137734aec713a0c?permalink_comment_id=4980403#gistcomment-4980403
export const useBreakpoint = (query: keyof typeof screens): boolean => {
  const mediaQuery = `(min-width: ${screens[query]})`;

  const matchQueryList = window.matchMedia(mediaQuery);

  const [match, setMatch] = useState<boolean>(false);

  const onChange = (e: MediaQueryListEvent) => setMatch(e.matches);

  useEffect(() => {
    setMatch(matchQueryList.matches);

    matchQueryList.addEventListener('change', onChange);
    return () => matchQueryList.removeEventListener('change', onChange);
  }, [query]);

  return match;
};
