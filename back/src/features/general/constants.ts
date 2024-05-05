import { Path } from "../../types/paths";

export const businessCategoryTree = {
  clothing: {
    women: {},
    men: {},
    kids: {},
    intimateApparelAndAccessories: {},
    sportswearAndActivewear: {},
    plusSize: {},
    seasonal: {},
  },
  computers: {
    laptops: {},
    desktops: {},
    networking: {},
    motherboard: {},
  },
  fastFood: {
    confectionery: {},
    pizzas: {},
    sandwiches: {},
    iceCream: {},
    burguers: {},
  },
};

export const businessCategoryLabels: Record<
  Path<typeof businessCategoryTree>,
  string
> = {
  clothing: "Vestuario",
  "clothing.sportswearAndActivewear": "Deportiva",
  "clothing.intimateApparelAndAccessories": "Íntimos y accesorios",
  "clothing.plusSize": "Tallas grandes",
  "clothing.seasonal": "Temporada",
  "clothing.kids": "Niños",
  "clothing.men": "Hombres",
  "clothing.women": "Mujeres",
  computers: "Computadoras y similares",
  "computers.desktops": "Escritorios",
  "computers.laptops": "Portatiles",
  "computers.motherboard": "Placas base",
  "computers.networking": "Redes",
  fastFood: "Comida rápida",
  "fastFood.burguers": "Hamburguesas",
  "fastFood.confectionery": "Confitería",
  "fastFood.iceCream": "Helados",
  "fastFood.pizzas": "Pizzas",
  "fastFood.sandwiches": "Sandwiches",
};
