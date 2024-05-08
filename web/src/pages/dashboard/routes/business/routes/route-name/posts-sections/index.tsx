import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useBusinessSectionsReorder } from 'features/api/business/useBusinessSectionsReorder';

import { RowActions } from './RowActions';

import SvgCheckCircle from 'icons/CheckCircle';
import SvgTimesCircle from 'icons/TimesCircle';
import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { useBusinessNewUpdateSection } from 'pages/@modals/useBusinessNewUpdateSection';
import { PostsLayoutSection } from 'types/business';
import { viewUtils } from 'utils/view';

export const PostsSections = () => {
  const { business, onFetch, status } = useBusiness();

  const { businessSectionsReorder } = useBusinessSectionsReorder();

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
            businessNewUpdateSection.open({
              onAfterSuccess: () => business && onFetch({ routeName: business.routeName }),
            });
          }}
          className="ml-auto"
        />

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
        heads={['Acciones', 'Nombre', 'Categorías', 'Visible en', 'Detalles']}
        getRowProps={(rowData) => {
          const { name, postCategoriesTags, hiddenName, searchLayout, showIn, postCardLayout } =
            rowData;

          const { shoppingMethod } = postCardLayout || {};

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              <div key={name} className="flex flex-col">
                {name}
                {hiddenName && <span className="text-red-500">(nombre oculto)</span>}
              </div>,
              tableCellCategoriesTags.onGetTableCellNode({ postCategoriesTags }),
              viewUtils.mapToOutlinedBox({ value: showIn }),
              viewUtils.keyValueList([
                {
                  label: 'Búsqueda',
                  value:
                    searchLayout !== 'none' ? (
                      <SvgCheckCircle className="fill-green-500 size-6" />
                    ) : (
                      <SvgTimesCircle className="fill-red-500 size-6" />
                    ),
                },
                {
                  label: 'Adicionar al carro',
                  value:
                    shoppingMethod === 'shoppingCart' ? (
                      <SvgCheckCircle className="fill-green-500 size-6" />
                    ) : (
                      <SvgTimesCircle className="fill-red-500 size-6" />
                    ),
                },
              ]),
            ],
          };
        }}
        data={data}
        isBusy={businessSectionsReorder.status.isBusy || status.isBusy}
      />
    </>
  );
};
