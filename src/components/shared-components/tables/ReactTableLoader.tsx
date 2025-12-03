// components/shared/TableSkeleton.tsx
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';

interface TableSkeletonProps<T extends object> {
  columns: ColumnDef<T, any>[];
  rowCount?: number;
  minWidth?: string;
}

const ReactTableLoader = <T extends object>({
  columns,
  rowCount = 5,
  minWidth = 'min-w-[1100px]',
}: TableSkeletonProps<T>) => {
  // use empty data just to render header properly
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] animate-pulse">
      <div className="max-w-full overflow-x-auto">
        <div className={minWidth}>
          <Table>
            {/* Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50/60 dark:bg-white/[0.02]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* Skeleton Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {table
                    .getAllColumns()
                    .filter((col) => col.getIsVisible())
                    .map((col, colIndex) => (
                      <TableCell key={colIndex} className="px-5 py-4 sm:px-6 text-start text-theme-sm">
                        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-white/[0.08]" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReactTableLoader;
