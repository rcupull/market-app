import { DocBlockItemComponent, DocBlockItemComponentProps } from './DocBlockItemComponent';
import { DocBlockVariant } from './types';

export interface DocBlockProps {
  title: string;
  summary: React.ReactNode;
  items: Array<DocBlockItemComponentProps>;
  variant?: DocBlockVariant;
}

export const DocBlock = ({ items, title, variant, summary }: DocBlockProps) => {
  return (
    <div>
      <h3 className="font-bold text-xl my-4">{title}</h3>

      <p>{summary}</p>

      {items.map((item, index) => {
        return <DocBlockItemComponent key={index} {...item} variant={variant} />;
      })}
    </div>
  );
};
