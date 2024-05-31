import { Navigate } from 'react-router-dom';

import { getOneBusinessRoute } from 'utils/business';

export interface HomeProps {
  routeName: string;
}

export const Home = ({ routeName }: HomeProps) => {
  return <Navigate to={getOneBusinessRoute({ routeName })} />;
};

export default Home;
