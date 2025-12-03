import { AddDetailsIcon, DeleteIcon, EditIcon, ViewIcon } from '@/components/shared-components/common/svgIcons';
import IconBtn from '@/components/shared-components/ui/button/IconBtn';
import { formatDate } from '@/helpers/helpers';
import { ColumnType } from '@/utils/enums';
import { ColumnKey } from '@/utils/types';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ColumnsProps<T> {
  getId?: boolean;
  setIsEditing?: (v: boolean) => void;
  openViewModal?: () => void; //view model

  setViewDetails?: React.Dispatch<React.SetStateAction<T | null>> | ((data: T | null) => void);
  openModal?: () => void; // edit model
  openDeleteModal?: () => void; // delete model
  setDeleteSlug?: (slug: string | null) => void;

  setEditingDetails?: React.Dispatch<React.SetStateAction<T | null>> | ((data: T | null) => void);
  columnsKey: ColumnKey[];
}

export const useTableColumns = <T extends { slug?: string }>({
  getId,
  setIsEditing,
  openModal,
  openViewModal,
  setViewDetails,
  openDeleteModal,
  setDeleteSlug,
  setEditingDetails,
  columnsKey,
}: ColumnsProps<T>) => {
  const router = useRouter();

  const handleDelete = (data: any) => {
    const id = data?.id;
    const slug = getId ? id : data?.slug;

    openDeleteModal?.();
    setDeleteSlug?.(slug);
  };

  const handleView = (data: T) => {
    openViewModal?.();
    setViewDetails?.(data);
  };

  const handleEdit = (data: T) => {
    openModal?.();
    setEditingDetails?.(data as any);
    setIsEditing?.(true);
  };

  const Columns: ColumnDef<T>[] = columnsKey.map((col) => {
    // ------------------------------
    // ACTIONS COLUMN
    // ------------------------------
    if (col.type === ColumnType.ACTIONS) {
      return {
        header: col.header,
        id: 'actions',
        // size: 250,
        cell: ({ row }) => {
          const data = row.original;
          const slug = data.slug;

          const { showDetailPopup = true, showAddMore = true, showEditBtn = true, showDeleteBtn = true, route } = col;

          return (
            <div className="flex gap-1">
              {showDetailPopup && (
                <IconBtn openModal={() => handleView(data)} icon={ViewIcon} showText={false} className="" />
              )}

              {showDeleteBtn && (
                <IconBtn openModal={() => handleDelete(data)} icon={DeleteIcon} showText={false} className="" />
              )}

              {showEditBtn && (
                <IconBtn openModal={() => handleEdit(data)} icon={EditIcon} showText={false} className="" />
              )}

              {showAddMore && (
                <IconBtn
                  openModal={() => router.push(`${route}${slug}`)}
                  icon={AddDetailsIcon}
                  showText={false}
                  className=""
                />
              )}
            </div>
          );
        },
      };
    }

    // ------------------------------
    // IMAGE COLUMN
    // ------------------------------
    if (col.type === ColumnType.IMAGE) {
      return {
        header: col.header,
        accessorKey: col.accessorKey,
        cell: ({ getValue }) => {
          const image = getValue<string | null>();
          return image ? (
            <div className="w-12 h-12 rounded-md overflow-hidden border">
              <Image src={image} alt="img" width={96} height={96} className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="w-12 h-12 flex items-center justify-center text-gray-400 text-xs border rounded-md">
              N/A
            </div>
          );
        },
      };
    }

    // ------------------------------
    // DATE RANGE COLUMN
    // ------------------------------
    if (col.type === ColumnType.DATE_RANGE) {
      return {
        header: col.header,
        accessorKey: col.accessorKey,
        cell: ({ getValue }) => {
          const data = getValue<any>();
          if (!data) return '-';
          const start = data[col.startKey] ?? '';
          const end = data[col.endKey] ?? '';
          return (
            <p className="font-medium text-gray-800 dark:text-white/80 text-sm">
              {start && end ? `${start} – ${end}` : start || end || '-'}
            </p>
          );
        },
      };
    }

    // ------------------------------
    // SINGLE DATE
    // ------------------------------
    if (col.type === ColumnType.DATE) {
      return {
        header: col.header,
        accessorKey: col.accessorKey,
        cell: ({ getValue }) => (
          <p className="font-medium text-gray-800 dark:text-white/80 text-sm">{formatDate(getValue<any>()) || '-'}</p>
        ),
      };
    }

    // ------------------------------
    // CURRENCY
    // ------------------------------
    if (col.type === ColumnType.CURRENCY) {
      return {
        header: col.header,
        accessorKey: col.accessorKey,
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return (
            <p className="font-medium text-gray-800 dark:text-white/80 text-sm">
              {value ? `${col.prefix || ''}${value}` : '-'}
            </p>
          );
        },
      };
    }

    // ------------------------------
    // ARRAY COLUMN
    // ------------------------------
    if (col.type === ColumnType.ARRAY) {
      return {
        header: col.header,
        accessorKey: col.accessorKey,
        cell: ({ row }) => {
          const arr = (row.original as any)[col.accessorKey];
          if (!Array.isArray(arr)) return '-';
          return arr.map((v: any) => v[col.arrayKey]).join(', ') || '-';
        },
      };
    }

    if (col.type === ColumnType.CUSTOM) {
      return {
        header: col.header,
        accessorKey: col.accessorKey,
        cell: ({ row }) => {
          // return col.render?.(row.original);
          return <p className="font-medium text-gray-800 dark:text-white/80 text-sm">{col.render?.(row.original)}</p>;
        },
      };
    }

    if (col.type === ColumnType.BOOLEAN) {
      return {
        header: col.header,
        accessorKey: col.accessorKey,
        cell: ({ getValue }) => {
          const value = getValue<boolean>();
          return <p className="font-medium text-gray-800 dark:text-white/80 text-sm">{value ? 'Yes' : 'No'}</p>;
        },
      };
    }

    // ------------------------------
    // DEFAULT TEXT COLUMN
    // ------------------------------
    return {
      header: col.header,
      accessorKey: col.accessorKey,
      cell: ({ getValue }) => {
        const value = getValue<string>();
        if (!value) return '—';

        if (col.truncate) {
          const truncated = value.length > col.truncate ? `${value.slice(0, col.truncate)}...` : value;
          return (
            <div title={value}>
              <p
                className={`font-medium capitalize text-gray-800 dark:text-white/80 text-sm line-clamp-2 ${col.classname}`}
              >
                {truncated}
              </p>
            </div>
          );
        }

        return (
          <p className={`font-medium capitalize text-gray-800 dark:text-white/80 text-sm ${col.classname}`}>{value}</p>
        );
      },
    };
  });

  return { Columns };
};
