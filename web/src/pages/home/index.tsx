import { HeroSectionCentered } from 'components/hero-section-centered';

import { Highlights } from './components/highlights';
import { Inspiration } from './components/inspiration';

import { LayoutPage } from 'pages/@common/layout-page';

export const Home = () => {

  return (
    <LayoutPage>
      <HeroSectionCentered />

      <Inspiration />

      <Highlights className="px-10 sm:px-0 my-20" />

    </LayoutPage>
  );
};

export default Home;
