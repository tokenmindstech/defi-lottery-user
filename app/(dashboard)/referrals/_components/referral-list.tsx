"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { cn, truncateString } from "@/lib/utils";
import {
  SortAscendingIcon,
  SortDescendingIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Define columns for the data table
const columns: ColumnDef<ReferredUser>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>
            Referral ID
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent rounded-xl hover:bg-transparent cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? (
              <SortAscendingIcon className="size-5 text-bgtext-500" />
            ) : (
              <SortDescendingIcon className="size-5 text-bgtext-500" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {truncateString(id, 12)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Name</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent rounded-xl hover:bg-transparent cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? (
              <SortAscendingIcon className="size-5 text-bgtext-500" />
            ) : (
              <SortDescendingIcon className="size-5 text-bgtext-500" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const name = row.original.user.name;
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {truncateString(name, 20)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>
            Date and Time Joined
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent rounded-xl hover:bg-transparent cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? (
              <SortAscendingIcon className="size-5 text-bgtext-500" />
            ) : (
              <SortDescendingIcon className="size-5 text-bgtext-500" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {dayjs(row.original.createdAt)
              .tz("Asia/Singapore")
              .format("DD/MM/YYYY | HH:mm:ss SGT")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "earnings",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Earnings</p>
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent rounded-xl hover:bg-transparent cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {column.getIsSorted() === "asc" ? (
              <SortAscendingIcon className="size-5 text-bgtext-500" />
            ) : (
              <SortDescendingIcon className="size-5 text-bgtext-500" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row space-x-2 w-full h-full items-center">
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
            }).format(row.original.earnings)}
          </span>
        </div>
      );
    },
  },
];

interface ReferralsTableProps {
  referredUsers: ReferredUser[];
}

export function ReferralsTable({ referredUsers }: ReferralsTableProps) {
  return (
    <div className="rounded-md overflow-hidden w-full">
      <DataTable columns={columns} data={referredUsers} />
    </div>
  );
}
