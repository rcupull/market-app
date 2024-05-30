import { Navigate } from 'react-router-dom';

import { getBusinessRoute } from 'utils/business';

export interface HomeProps {
  routeName: string;
}

export const Home = ({ routeName }: HomeProps) => {
  return <Navigate to={getBusinessRoute({ routeName })} />;
};

export default Home;
