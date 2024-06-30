import { ButtonRefresh } from 'components/button-refresh';
import { IconButtonRefresh } from 'components/icon-button-refresh';
import { Table } from 'components/table';

import { useBusinessSectionsReorder } from 'features/api/business/useBusinessSectionsReorder';

import { IconButtonShowHideSection } from './IconButtonShowHideSection';
import { NewSectionButton } from './NewSectionButton';
import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostsLayoutSection } from 'types/business';
import { cn } from 'utils/general';

export const PostsSections = () => {
  const { business, onFetch, status } = useBusiness();

  const { businessSectionsReorder } = useBusinessSectionsReorder();

  const data = business?.layouts?.posts?.sections || [];

  const buttonRefresh = (
    <>
      <ButtonRefresh
        onClick={() => business && onFetch({ routeName: business.routeName })}
        className="hidden sm:block"
      />

      <IconButtonRefresh
        onClick={() => business && onFetch({ routeName: business.routeName })}
        isBusy={status.isBusy}
        className="block sm:hidden"
      />
    </>
  );

  return (
    <>
      <TopActions>
        <NewSectionButton />

        {buttonRefresh}
      </TopActions>
      <Table<PostsLayoutSection>
        remapRowsIndex={{
          xs: [[0, 1, 2, 3]],
          lg: 'none',
        }}
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
        heads={['Acciones', 'Nombre', 'Tipo', 'Oculto']}
        getRowProps={(rowData) => {
          const { name, hiddenName, postType, hidden } = rowData;

          return {
            className: cn({
              'bg-gray-100': hidden,
            }),
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              <div key={name} className="flex flex-col">
                {name}
                {hiddenName && <span className="text-red-500">(nombre oculto)</span>}
              </div>,
              postType === 'product' ? 'Productos' : 'Enlaces',
              <IconButtonShowHideSection key="hidden" rowData={rowData} />,
            ],
          };
        }}
        data={data}
        isBusy={businessSectionsReorder.status.isBusy || status.isBusy}
      />
    </>
  );
};
