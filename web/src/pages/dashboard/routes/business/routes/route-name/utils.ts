export type BusinessTab = 'products' | 'links' | 'sections' | 'shopping' | 'billing' | 'settings';

export const getBusinessTabLabel = (tab: BusinessTab): string => {
  const record: Record<BusinessTab, string> = {
    products: 'Productos',
    billing: 'Facturación',
    links: 'Enlaces',
    sections: 'Secciones',
    settings: 'Configuración',
    shopping: 'Órdenes de compras',
  };

  return record[tab] || 'unknown tab';
};
