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
  mercado: {
    fresh: {},
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
  mercado: "Mercado",
  "mercado.fresh": "Congelados",
};
