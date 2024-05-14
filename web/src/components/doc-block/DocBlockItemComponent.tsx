import { HtmlTextContainer } from 'components/html-text-container';

import { DocBlockItem, DocBlockVariant } from './types';

export interface DocBlockItemComponentProps extends DocBlockItem {
  variant?: DocBlockVariant;
}

export const DocBlockItemComponent = ({
  items,
  title,
  variant = 'bullet',
}: DocBlockItemComponentProps) => {
  const renderList = (content: React.ReactNode) => {
    if (variant === 'bullet') {
      return <ul className="ml-4">{content}</ul>;
    }
    return <ol className="ml-4">{content}</ol>;
  };

  return (
    <HtmlTextContainer>
      <h4 className="font-bold  my-4">{title}</h4>

      {renderList(
        items.map((item, index) => {
          return (
            <li key={index} className="text-sm my-1">
              {item}
            </li>
          );
        }),
      )}
    </HtmlTextContainer>
  );
};
