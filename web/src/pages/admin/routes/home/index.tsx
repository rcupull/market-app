import { LayoutPage } from 'pages/@common/layout-page';

export const Home = () => {
  return (
    <LayoutPage>
      <div className="flex justify-center items-center w-full h-96">
        <span className="text-2xl text-gray-500 font-bold">Bienvenido a la página de Admin</span>
      </div>
    </LayoutPage>
  );
};

export default Home;
