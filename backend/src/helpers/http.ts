export interface QueryParamsProps {
  [key: string]:
    | undefined
    | string
    | string[]
    | number
    | boolean
    | QueryParamsProps
    | QueryParamsProps[];
}

export interface BaseQueryParamsProps {
  page?: string;
  per_page?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  term?: string;
  id?: string;
}
