import { useEffect, useState } from 'react';

import { Button, ButtonProps } from 'components/button';

import SvgAngleLeftSolid from 'icons/AngleLeftSolid';
import SvgAngleRightSolid from 'icons/AngleRightSolid';
import { Paginator } from 'types/api';
import { StyleProps } from 'types/general';
import { cn, getRange, isNullOrUndefined, isNumber } from 'utils/general';

const NavButton = ({ className, ...omittedProps }: ButtonProps) => {
  return (
    <Button
      className={cn(
        'w-10 rounded-none relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
        className,
      )}
      variant="outlined"
      {...omittedProps}
    />
  );
};

export interface PaginationProps extends StyleProps {
  onChange?: (newPaginator: Paginator) => void;
  paginator?: Paginator | null;
}

const defaultPageBySection = 5;

export const Pagination = ({ paginator, onChange, className }: PaginationProps) => {
  const { page, hasNextPage, hasPrevPage, pageCount } = paginator || {};

  const [startPage, setStartPage] = useState(1);
  const [pagesBySections, setPagesBySections] = useState<number>();

  useEffect(() => {
    if (isNullOrUndefined(page)) return;
    if (isNullOrUndefined(pageCount)) return;

    if (pagesBySections === undefined) {
      setPagesBySections(
        isNumber(pageCount) && pageCount > defaultPageBySection ? defaultPageBySection : pageCount,
      );
    }

    if (page > startPage + defaultPageBySection - 1) {
      const newStartPage = startPage + defaultPageBySection;
      setStartPage(newStartPage);

      if (newStartPage + defaultPageBySection > pageCount) {
        return setPagesBySections(pageCount - newStartPage + 1);
      } else {
        return setPagesBySections(defaultPageBySection);
      }
    }
    if (page < startPage) {
      const newStartPage = startPage - defaultPageBySection;

      setPagesBySections(defaultPageBySection);

      if (newStartPage < 1) {
        return setStartPage(1);
      } else {
        return setStartPage(newStartPage);
      }
    }
  }, [page, startPage, pageCount]);

  if (!paginator) return <></>;

  const handleChange = (partialPaginator: Partial<Paginator>) => {
    onChange?.({ ...paginator, ...partialPaginator });
  };
  const handleNext = () => {
    const { page } = paginator;

    if (hasNextPage) {
      handleChange({ page: page + 1 });
    }
  };

  const handlePrev = () => {
    const { page } = paginator;

    if (hasPrevPage) {
      handleChange({ page: page - 1 });
    }
  };

  const range = getRange(pagesBySections).map((r) => r + startPage);

  const getInfo = (): React.ReactNode => {
    if (!paginator) return null;

    const { page, limit, dataCount } = paginator;
    const beginItems = (page - 1) * limit + 1;
    const end = (page - 1) * limit + limit;
    const endItems = end > dataCount ? dataCount : end;

    return (
      <div>
        <p className="text-sm text-gray-700">
          <span className="font-medium">{`Mostrando ${beginItems} - ${endItems} de ${dataCount}`}</span>
        </p>
      </div>
    );
  };

  const xsPaginator = (
    <div className="flex flex-1 justify-between sm:hidden">
      <Button label="Anterior" disabled={!hasPrevPage} onClick={handlePrev} variant="outlined" />

      <Button label="Siguiente" disabled={!hasNextPage} onClick={handleNext} variant="outlined" />
    </div>
  );

  const smPaginator = (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      {getInfo()}
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <NavButton
            svg={SvgAngleLeftSolid}
            className="rounded-l-md"
            disabled={!hasPrevPage}
            onClick={handlePrev}
          />

          {range.map((index) => {
            return (
              <NavButton
                key={index}
                label={`${index}`}
                variant={page === index ? 'primary' : 'outlined'}
                onClick={() => handleChange({ page: index })}
              />
            );
          })}

          <NavButton
            svg={SvgAngleRightSolid}
            className="rounded-r-md"
            disabled={!hasNextPage}
            onClick={handleNext}
          />
        </nav>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6',
        className,
      )}
    >
      {xsPaginator}
      {smPaginator}
    </div>
  );
};
