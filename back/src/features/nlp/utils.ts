import { NlpTrainRecord } from '../../types/nlpRecord';

export const nlpRecords: NlpTrainRecord = {
  'products.add': [
    'quiero agregar un producto',
    'como agregar un producto',
    'nuevo producto',
    'nuevo mercancia',
    'mercancia',
  ],
  'links.add': [
    'quiero agregar un enlace',
    'nuevo enlace',
    'enlace a otra pagina',
    'enlace a un negocio',
    'link a un negocio',
  ],
  'sections.add': [
    'agrupar enlaces',
    'agrupar productos',
    'grupos',
    'grupo de enlaces',
    'grupo de productos',
    'nueva seccion',
    'nuevo grupo',
  ],
};

const mergeInTrainRecord = (
  record: NlpTrainRecord,
  key: string,
  values: Array<string>
): NlpTrainRecord => ({
  ...record,
  [key]: [...(record[key] || []), ...values],
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 *  TAGS
 * products.price.max
 * products.price.min
 * products.price.min.max
 *
 * products.name.{productName}
 * products.name.{productName}.price.min
 * products.name.{productName}.price.max
 *
 * business.name.{businessName}
 *
 * business.category.{categoryLabel}
 */

const getterMax = (label: string) => [
  `${label} precio maximo`,
  `${label} precios maximos`,
  `${label} pago hasta`,
  `${label} pago hasta un maximo`,
  `${label} pago hasta un precio maximo`,
  `${label} no mayor que`,
  `${label} que no sobrepase los`,
  `${label} que custe hasta`,
  `${label} barato hasta`,
  `${label} no mas caro que`,
  `${label} barato`,
  `${label} que no cueste mas de`,
  `${label} que no cueste mas que`,
  `${label} que no sobrepase los`,
];

const getterMin = (label: string) => [
  `${label} precio minimo`,
  `${label} precio minimo`,
  `${label} pago desde`,
  `${label} pago desde un minimo`,
  `${label} pago desde un precio minimo`,
  `${label} no menor que`,
  `${label} que supere los`,
  `${label} mas caro que`,
  `${label} caro`,
  `${label} que no cueste menos de`,
  `${label} que no cueste menos que`,
  `${label} que no infiera los`,
];

const getterMinMax = (label: string) => [
  `${label} precio minimo precio maximo`,
  `${label} precio minimo`,
  `${label} pago desde hasta`,
  `${label} entre y`,
  `${label} con valor entre`,
  `${label} con precio entre`,
  `${label} pago desde un minimo de hasta un maximo de `,
  `${label} pago desde un precio minimo hasta un precio maximo`,
  `${label} no menor que y no mayour a`,
  `${label} no menor a y no mayour que`,
  `${label} no menor a y no mayour a`,
  `${label} no menor que y no mayour que`,
  `${label} que supere los y no super`,
  `${label} que supere los y no pase`,
  `${label} mas caro que y no mas caro que`,
  `${label} que no cueste menos de y no mas caro que`,
  `${label} que no cueste menos que y no mas caro que`,
  `${label} que no infiera los y no pase los`,
];

export const addPriceRecords = (record: NlpTrainRecord): NlpTrainRecord => {
  let out = record;

  out = mergeInTrainRecord(out, 'products.price.max', [...getterMax('')]);
  out = mergeInTrainRecord(out, 'products.price.min', [...getterMin('')]);
  out = mergeInTrainRecord(out, 'products.price.min.max', [...getterMinMax('')]);

  return out;
};

export const addProductNameRecords = (record: NlpTrainRecord, name: string): NlpTrainRecord => {
  let out = record;

  out = mergeInTrainRecord(out, `products.name.${name}`, [
    name,
    `Estoy buscando productos de ${name}`,
    `Busco productos de ${name}`,
    `Busco ${name}`,
    `Estoy buscando ${name}`,
    `Busco ${name} en ${name}`,
    `Existe ${name} en ${name}`,
    `Estoy buscando ${name} en ${name}`,
    `Para ${name}`,
  ]);

  return out;
};

export const addBusinessNameRecords = (record: NlpTrainRecord, name: string): NlpTrainRecord => {
  let out = record;

  out = mergeInTrainRecord(out, `business.name.${name}`, [
    name,
    `Estoy buscando productos ${name}`,
    `Me hablaron de ${name}`,
    `Busco ${name}`,
    `Estoy buscando ${name}`,
    `Existe ${name}`,
    `En ${name}`,
  ]);

  return out;
};

export const addBusinessCategoryRecords = (
  record: NlpTrainRecord,
  {
    businessName,
    categoryLabel,
  }: {
    categoryLabel: string;
    businessName: string;
  }
): NlpTrainRecord => {
  let out = record;

  out = mergeInTrainRecord(out, `business.category.${categoryLabel}`, [
    categoryLabel,
    `Estoy buscando productos de ${categoryLabel}`,
    `Busco productos de ${categoryLabel}`,
    `Busco ${categoryLabel}`,
    `Estoy buscando ${categoryLabel}`,
    `Busco ${categoryLabel} en ${businessName}`,
    `Existe ${categoryLabel} en ${businessName}`,
    `Estoy buscando ${categoryLabel} en ${businessName}`,
    `Para ${categoryLabel}`,
  ]);

  return out;
};

export const addProductPriceRecords = (record: NlpTrainRecord, name: string): NlpTrainRecord => {
  let out = record;

  out = mergeInTrainRecord(out, `products.name.${name}.price.max`, [
    ...getterMax(name),
    ...getterMax(`necesito ${name}`),
    ...getterMax(`busco ${name}`),
    ...getterMax(`requierp ${name}`),
    ...getterMax(`exijo ${name}`),
    ...getterMax(`ando buscando ${name}`),
  ]);

  out = mergeInTrainRecord(out, `products.name.${name}.price.min`, [
    ...getterMin(name),
    ...getterMin(`necesito ${name}`),
    ...getterMin(`busco ${name}`),
    ...getterMin(`requierp ${name}`),
    ...getterMin(`exijo ${name}`),
    ...getterMin(`ando buscando ${name}`),
  ]);

  out = mergeInTrainRecord(out, `products.name.${name}.price.min.max`, [
    ...getterMinMax(name),
    ...getterMinMax(`necesito ${name}`),
    ...getterMinMax(`busco ${name}`),
    ...getterMinMax(`requierp ${name}`),
    ...getterMinMax(`exijo ${name}`),
    ...getterMinMax(`ando buscando ${name}`),
  ]);

  return out;
};
