import { BusinessCategory, PostCategory } from '../../types/business';
import { addStringToUniqueArray, replaceAll } from '../../utils/general';

export const getPostCategoriesFromBusinessCategories = (
  businessCategories: Array<BusinessCategory>
): Array<PostCategory> => {
  let allLabels: Array<string> = [];

  const ifStartWithThenAdd = (
    businessCategory: BusinessCategory,
    match: BusinessCategory,
    val: Array<string>
  ) => {
    if (businessCategory.startsWith(match)) {
      allLabels = val.reduce((acc, v) => addStringToUniqueArray(acc, v), allLabels);
    }
  };

  businessCategories.forEach((businessCategory) => {
    ifStartWithThenAdd(businessCategory, 'clothing', ['Recientes']);
    ifStartWithThenAdd(businessCategory, 'clothing', ['Ofertas']);
    ifStartWithThenAdd(businessCategory, 'clothing.men', ['Hombres']);
    ifStartWithThenAdd(businessCategory, 'clothing.kids', ['Niños']);
    ifStartWithThenAdd(businessCategory, 'clothing.women', ['Mujeres']);
    ifStartWithThenAdd(businessCategory, 'clothing.sportswearAndActivewear', ['Deportivas']);

    //////////////////////////////////////////////////////////////////////

    ifStartWithThenAdd(businessCategory, 'fastFood', [
      'Ofertas del día',
      'Especialidad de la casa',
      'Más vendido',
    ]);

    //////////////////////////////////////////////////////////////////////

    ifStartWithThenAdd(businessCategory, 'computers', ['Ofertas', 'Nuevos Productos']);

    //////////////////////////////////////////////////////////////////////
    ifStartWithThenAdd(businessCategory, 'house', ['Ofertas']);
    ifStartWithThenAdd(businessCategory, 'house.rent', [
      'Para cubanos',
      'Para extranjeros',
      'Por horas',
      'Por tiempo indefinido',
      'Económicos',
      'En la ciudad',
      'En la Playa',
    ]);

    //////////////////////////////////////////////////////////////////////
    ifStartWithThenAdd(businessCategory, 'services', ['Nuevas ofertas', 'Especiales', 'Rebajas']);

    //////////////////////////////////////////////////////////////////////
    ifStartWithThenAdd(businessCategory, 'miscellaneousItems', ['Nuevas ofertas', 'Rebajas']);
  });

  return allLabels.map((label) => ({ label, tag: getPostCategoryTag(label) }));
};

// is the same functio that frontend
export const getPostCategoryTag = (label: string): string => {
  let out = label.trim().toLowerCase();
  out = replaceAll(out, ' ', '_');
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  return out;
};
