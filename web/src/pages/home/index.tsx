import { HeroSectionCentered } from 'components/hero-section-centered';

import { useBreakpoints } from 'hooks/useBreakpoints';

import { Highlights } from './components/highlights';
import { Inspiration } from './components/inspiration';

import { LayoutPage } from 'pages/@common/layout-page';

export const Home = () => {
  const breakpoints = useBreakpoints();
  return (
    <LayoutPage>
      <HeroSectionCentered />

      {!breakpoints.xs && (
        <>
          <Inspiration />

          <Highlights className="px-10 sm:px-0 my-20" />
        </>
      )}
    </LayoutPage>
  );
};

export default Home;
