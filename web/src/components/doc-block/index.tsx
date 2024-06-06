import { DocBlockItemComponent, DocBlockItemComponentProps } from './DocBlockItemComponent';
import { DocBlockVariant } from './types';

import { StyleProps } from 'types/general';

export interface DocBlockProps extends StyleProps {
  title?: string;
  summary?: React.ReactNode;
  items: Array<DocBlockItemComponentProps>;
  variant?: DocBlockVariant;
}

export const DocBlock = ({ items, title, variant, summary, className }: DocBlockProps) => {
  return (
    <div className={className}>
      {title && <h3 className="font-bold text-xl my-4">{title}</h3>}

      {summary && <p>{summary}</p>}

      {items.map((item, index) => {
        return <DocBlockItemComponent key={index} {...item} variant={variant} />;
      })}
    </div>
  );
};
