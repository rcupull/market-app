import { Divider } from 'components/divider';

import { ListDetailsKey } from 'pages/@common/list-details-key';
import { ListDetailsValue } from 'pages/@common/list-details-value';
import { Post } from 'types/post';

export interface LinkDetailsProps {
  rowData: Post;
}
export const LinkDetails = ({ rowData }: LinkDetailsProps) => {
  const { postLink } = rowData;

  const getLinkTypeLabel = () => {
    if (postLink?.type === 'business') {
      return 'Negocio';
    }

    if (postLink?.type === 'external') {
      return 'Externo';
    }

    return '<unknown>';
  };

  return (
    <div className="w-48">
      <ListDetailsKey label="Tipo" />
      <ListDetailsValue value={getLinkTypeLabel()} />

      <Divider narrow />

      <ListDetailsKey label="Valor" />
      <ListDetailsValue value={<div title={postLink?.value}>{postLink?.value}</div>} />
    </div>
  );
};
