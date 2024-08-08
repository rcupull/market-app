export interface DocBlockItem {
  title: string;
  items: Array<React.ReactNode>;
}

export type DocBlockVariant = 'bullet' | 'numered';
