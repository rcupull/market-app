import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useBusinessSectionsReorder } from 'features/api/business/useBusinessSectionsReorder';

import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { PostsLayoutSection } from 'types/business';
import { viewUtils } from 'utils/view';

export const PostsSections = () => {
  const { business, onFetch, status } = useBusiness();

  const { businessSectionsReorder } = useBusinessSectionsReorder();

  const data = business?.layouts?.posts?.sections || [];

  const businessNewUpdateSection = useBusinessNewUpdateSection();

  const handleNewProductsSections = () => {
    businessNewUpdateSection.open({
      postType: 'product',
      onAfterSuccess: () => business && onFetch({ routeName: business.routeName }),
    });
  };

  const handleNewLinksSections = () => {
    businessNewUpdateSection.open({
      postType: 'link',
      onAfterSuccess: () => business && onFetch({ routeName: business.routeName }),
    });
  };

  return (
    <>
      <TopActions>
        <ButtonNew
          label="Nueva de productos"
          onClick={handleNewProductsSections}
          className="ml-auto"
        />

        <ButtonNew label="Nueva de enlaces" onClick={handleNewLinksSections} />

        <ButtonRefresh onClick={() => business && onFetch({ routeName: business.routeName })} />
      </TopActions>
      <Table<PostsLayoutSection>
        enabledReorder
        onReorder={({ fromIndex, toIndex }) => {
          if (!business) return;

          businessSectionsReorder.fetch(
            { routeName: business?.routeName, fromIndex, toIndex },
            {
              onAfterSuccess: () => {
                onFetch({ routeName: business?.routeName });
              },
            },
          );
        }}
        heads={['Acciones', 'Nombre', 'Tipo', 'Visible en']}
        getRowProps={(rowData) => {
          const { name, hiddenName, showIn, postType } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              <div key={name} className="flex flex-col">
                {name}
                {hiddenName && <span className="text-red-500">(nombre oculto)</span>}
              </div>,
              postType === 'product' ? 'Productos' : 'Enlaces',
              viewUtils.mapToOutlinedBox({ value: showIn }),
            ],
          };
        }}
        data={data}
        isBusy={businessSectionsReorder.status.isBusy || status.isBusy}
      />
    </>
  );
};
