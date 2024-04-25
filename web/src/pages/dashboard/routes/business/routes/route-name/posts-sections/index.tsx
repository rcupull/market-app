import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { PostsLayoutSection } from 'types/business';
import { getSearchLayoutLabel } from 'utils/business';
import { viewUtils } from 'utils/view';

export interface PostsSectionsProps {
  routeName: string;
}

export const PostsSections = ({ routeName }: PostsSectionsProps) => {
  const { business, onFetch } = useBusiness();

  const data = business?.layouts?.posts?.sections || [];

  const tableCellCategoriesTags = useTableCellCategoriesTags({
    business,
  });

  const businessNewUpdateSection = useBusinessNewUpdateSection();

  return (
    <>
      <TopActions>
        <ButtonNew
          label="Nuevo grupo"
          onClick={() => {
            businessNewUpdateSection.open();
          }}
          className="ml-auto"
        />

        <ButtonRefresh onClick={() => onFetch({ routeName })} />
      </TopActions>
      <Table<PostsLayoutSection>
        heads={[null, 'Nombre', 'Categorías', 'Visible en', 'Búsqueda']}
        getRowProps={(rowData) => {
          const { name, postCategoriesTags, hiddenName, searchLayout, showIn } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} routeName={routeName} />,
              <div key={name} className="flex flex-col">
                {name}
                {hiddenName && <span className="text-red-500">(nombre oculto)</span>}
              </div>,
              tableCellCategoriesTags.onGetTableCellNode({ postCategoriesTags }),
              viewUtils.mapToOutlinedBox({ value: showIn }),
              searchLayout && getSearchLayoutLabel(searchLayout),
            ],
          };
        }}
        data={data}
      />
    </>
  );
};
