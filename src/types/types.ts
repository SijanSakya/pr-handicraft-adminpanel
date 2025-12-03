import { ColumnType } from '@/utils/enums';

export type ColumnKey =
  | {
      type?: undefined; // default text column
      header: string;
      accessorKey: string;
      truncate?: number;
      classname?: string;
    }
  | {
      type: ColumnType.IMAGE;
      header: string;
      accessorKey: string;
    }
  | {
      type: ColumnType.CURRENCY;
      header: string;
      accessorKey: string;
      prefix?: string;
    }
  | {
      type: ColumnType.DATE_RANGE;
      header: string;
      accessorKey: string;
      startKey: string;
      endKey: string;
    }
  | {
      type: ColumnType.DATE;
      header: string;
      accessorKey: string;
    }
  | {
      type: ColumnType.ARRAY;
      header: string;
      accessorKey: string;
      arrayKey: string;
    }
  | {
      type: ColumnType.ACTIONS;
      header: string;
      showDetailPopup?: boolean;
      showAddMore?: boolean;
      showEditBtn?: boolean;
      showDeleteBtn?: boolean;
      route?: string;
    };
