"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { cn, truncateString } from "@/lib/utils";
import { SortAscending, SortDescending } from "@phosphor-icons/react/dist/ssr";
import { DataTable } from "@/components/shared/data-table";
import Link from "next/link";
import Image from "next/image";

// Define columns for the data table
const columns: ColumnDef<Commission>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>
            Commission ID
          </p>
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
            {truncateString(row.original.id, 12)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>
            Description
          </p>
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
            {truncateString(row.original.description, 30)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
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
            {dayjs(row.original.updatedAt).format("DD/MM/YYYY | HH:mm:ss UTC")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="flex w-full items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Amount</p>
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
        <div className="flex gap-2 justify-center">
          <Image
            src="/assets/images/coin.png"
            alt="coin"
            className="object-contain"
            width={20}
            height={20}
          />
          <span className="text-bgtext-500 text-base">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(row.original.amount)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isClaimed",
    header: ({ column }) => {
      return (
        <div className="flex w-full items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Status</p>
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
        <div className="flex flex-row space-x-2 w-full h-full items-center justify-center">
          {row.original.isClaimed === true ? (
            <span className="text-linsea-start">Claimed</span>
          ) : (
            <span className="text-destructive">Not Claimed</span>
          )}
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
        <div className="flex">
          <Link
            href={row.original.txHash || "#"}
            className={`py-1 text-sm text-linsea-start`}
          >
            {truncateString(row.original.txHash || "", 20)}
          </Link>
        </div>
      );
    },
  },
];

interface CommissionHistoryTableProps {
  histories: Commission[];
}

export function CommissionHistoryTable({
  histories,
}: CommissionHistoryTableProps) {
  return (
    <div className="rounded-md overflow-hidden w-full">
      <DataTable columns={columns} data={histories} />
    </div>
  );
}
