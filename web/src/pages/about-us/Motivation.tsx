import { cn } from 'utils/general';

export const Motivation = () => {
  const renderImage = (src: string, className: string) => {
    return (
      <div className={cn('border w-40 h-60 border-gray-400 rounded-xl bg-gray-100', className)}>
        <img src={src} className="w-full h-full object-cover rounded-xl" />
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-10">
      <div className="flex flex-col justify-center">
        <p className="text-5xl font-bold text-center sm:text-left">Estamos cambiando como las personas piensan</p>

        <p className="mt-8 sm:mt-4">
          Somos un equipo tecnologico y de comunicacion con el proposito de cambiar parte de la
          realidad cubana, reduciendo los limites entre un emprendedor con ancias de exito y un
          mundo tecnologico dificil de tocar desde el interior de Cuba.
        </p>
      </div>

      <div className="flex justify-center items-center flex-shrink-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-8 gap-x-14 sm:gap-x-8 gap-y-8 w-fit">
          {renderImage(
            'https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80',
            'col-start-1 col-span-1 row-start-2 lg:row-start-5 row-span-3',
          )}

          {renderImage(
            'https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80',
            'col-start-1 lg:col-start-2 col-span-1 row-start-5 lg:row-start-3 row-span-3',
          )}

          {renderImage(
            'https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80',
            'col-start-2 col-span-1 row-start-1 lg:row-start-6 row-span-3',
          )}

          {renderImage(
            'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80',
            'col-start-2 lg:col-start-3 col-span-1 row-start-4 lg:row-start-1 row-span-3',
          )}

          {renderImage(
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80',
            'col-start-2 lg:col-start-3 col-span-1row-start-7 lg:row-start-4 row-span-3 hidden lg:block',
          )}
        </div>
      </div>
    </div>
  );
};
