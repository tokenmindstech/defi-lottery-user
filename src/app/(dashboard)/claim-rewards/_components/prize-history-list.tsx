"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { cn, truncateString } from "@/lib/utils";
import { SortAscending, SortDescending } from "@phosphor-icons/react/dist/ssr";
import { DataTable } from "@/components/shared/data-table";
import Link from "next/link";

// Define columns for the data table
const columns: ColumnDef<ClaimHistory>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Ticket ID</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent rounded-xl hover:bg-transparent cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? (
              <SortAscending className="size-5 text-bgtext-500" />
            ) : (
              <SortDescending className="size-5 text-bgtext-500" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-28 md:w-24">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {truncateString(row.original.id, 12)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "claimedAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Date</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent rounded-xl hover:bg-transparent cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? (
              <SortAscending className="size-5 text-bgtext-500" />
            ) : (
              <SortDescending className="size-5 text-bgtext-500" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {dayjs(row.original.claimedAt).format("DD/MM/YYYY | HH:mm:ss UTC")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "txHash",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Tx Hash</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent rounded-xl hover:bg-transparent cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? (
              <SortAscending className="size-5 text-bgtext-500" />
            ) : (
              <SortDescending className="size-5 text-bgtext-500" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-28 md:w-24">
          <Link
            href={row.original.txHash}
            className={`py-1 text-sm text-linsea-start`}
          >
            {row.original.txHash}
          </Link>
        </div>
      );
    },
  },
];

interface PrizeHistoryTableProps {
  histories: ClaimHistory[];
}

export function PrizeHistoryTable({ histories }: PrizeHistoryTableProps) {
  return (
    <div className="rounded-md overflow-hidden w-full">
      <DataTable columns={columns} data={histories} />
    </div>
  );
}
