import { Mission } from './Mission';
import { Motivation } from './Motivation';

import { LayoutPage } from 'pages/@common/layout-page';

export const AboutUs = () => {
  return (
    <LayoutPage title="¿Que es Asere Market?">
      <Motivation />

      <Mission className="mt-20" />

      <div className="h-[25rem] overflow-hidden rounded-xl flex items-center my-16">
        <img
          className="object-cover rounded-xl"
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        />
      </div>
    </LayoutPage>
  );
};
