import { Navigate } from 'react-router-dom';

export const Home = () => {
  /**
   * TODO en esta pagina se mostraran estadisticas del uso de la plataforma y de los planes y usuarios
   */
  return <Navigate to="/admin/users" />;
};

export default Home;
