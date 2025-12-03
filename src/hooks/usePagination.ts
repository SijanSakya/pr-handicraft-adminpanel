import { SetStateAction, useMemo } from 'react';

export const usePagination = ({
  data,
  page,
  setPage,
  itemPerPage = 10,
}: {
  data: any;
  page: any;
  setPage: any;
  itemPerPage?: any;
}) => {
  const ITEMS_PER_PAGE = itemPerPage;
  const totalCount = data?.count ?? data?.length;

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / itemPerPage) ?? 1;
  }, [totalCount, itemPerPage]);

  const handlePageChange = (page: { page: SetStateAction<number> }) => {
    setPage(page);
  };
  const handleSelectedPage = (page: { page: SetStateAction<number | null> }) => {
    setPage(page);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;
  const currentData = data?.results;

  return {
    currentData,
    totalPages,
    handlePageChange,
    handleSelectedPage,
    currentPage: page,
    totalCount,
  };
};
