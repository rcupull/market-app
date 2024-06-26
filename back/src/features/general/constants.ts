import { Path } from '../../types/paths';

export const businessCategoryTree = {
  clothing: {
    women: {},
    men: {},
    kids: {},
    intimateApparelAndAccessories: {},
    sportswearAndActivewear: {},
    plusSize: {},
  },
  computers: {
    laptops: {},
    desktops: {},
    networking: {},
    motherboard: {},
    accesories: {},
  },
  fastFood: {
    confectionery: {},
    pizzas: {},
    sandwiches: {},
    iceCream: {},
    burguers: {},
  },
  house: {
    rent: {},
  },
  miscellaneousItems: {
    householdSupplies: {},
  },
  services: {
    classesAndCurses: {},
    computing: {},
    cleaning: {},
    photographyAndVideo: {},
    designAndDecoration: {},
    construction: {},
    maintenance: {},
    hairdressingAndBeauty: {},
    spa: {},
  },
};

export const businessCategoryLabels: Record<Path<typeof businessCategoryTree>, string> = {
  clothing: 'Vestuario',
  'clothing.sportswearAndActivewear': 'Deportiva',
  'clothing.intimateApparelAndAccessories': 'Íntimos y accesorios',
  'clothing.plusSize': 'Tallas grandes',
  'clothing.kids': 'Niños',
  'clothing.men': 'Hombres',
  'clothing.women': 'Mujeres',
  computers: 'Computadoras y similares',
  'computers.desktops': 'Escritorios',
  'computers.laptops': 'Portatiles',
  'computers.motherboard': 'Placas base',
  'computers.networking': 'Redes',
  'computers.accesories': 'Accesorios',
  fastFood: 'Comida rápida',
  'fastFood.burguers': 'Hamburguesas',
  'fastFood.confectionery': 'Confitería',
  'fastFood.iceCream': 'Helados',
  'fastFood.pizzas': 'Pizzas',
  'fastFood.sandwiches': 'Sandwiches',
  house: 'Casas',
  'house.rent': 'Rentas',
  services: 'Servicios',
  'services.classesAndCurses': 'Classes y cursos',
  'services.cleaning': 'Limpieza',
  'services.computing': 'Informática',
  'services.construction': 'Construccion',
  'services.designAndDecoration': 'Diseño y decoración',
  'services.hairdressingAndBeauty': 'Peluquería y belleza',
  'services.maintenance': 'Mantenimiento',
  'services.spa': 'spa',
  'services.photographyAndVideo': 'Fotografía y video',
  miscellaneousItems: 'Venta de artículos varios',
  'miscellaneousItems.householdSupplies': 'Útiles del hogar',
};
