export interface PaginationProps {
  data: Array<object>;
  meta: {
    total: number;
    lastPage: number | null;
    currentPage: number | null;
    perPage: number | null;
    prev: number | null;
    next: number | null;
  };
}
