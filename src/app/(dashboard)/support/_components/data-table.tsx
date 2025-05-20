"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md">
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-bgtext-900 border-none hover:bg-bgtext-700 ease-out transition-all duration-300"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-0"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex h-full items-center justify-between text-left text-sm font-medium text-bgtext-100 px-2 py-4",
                          header.index < headerGroup.headers.length - 1 &&
                            "border-r border-bgtext-800"
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="bg-bgtext-950 text-bgtext-100 hover:bg-bgtext-700 ease-out transition-all duration-300"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "border-y border-bgtext-800 py-4 text-sm font-normal text-gray-300",
                        cell.column.getIndex() !== 0 &&
                          "border-l border-bgtext-800",
                        cell.column.getIndex() !==
                          row.getVisibleCells().length - 1 &&
                          "border-r border-bgtext-800"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-bgtext-950">
              <TableCell
                colSpan={columns.length}
                className="py-5 border-none text-center text-sm font-medium text-bgtext-100 border border-bgtext-800"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
