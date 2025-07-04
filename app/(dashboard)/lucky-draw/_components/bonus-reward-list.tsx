"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { censorString, cn, truncateString } from "@/lib/utils";
import {
  SortAscendingIcon,
  SortDescendingIcon,
} from "@phosphor-icons/react/dist/ssr";
import { DataTable } from "@/components/shared/data-table";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Define columns for the data table
const columns: ColumnDef<Perks>[] = [
  {
    id: "no",
    header: () => (
      <div className="flex items-center justify-center space-x-1">
        <p className={cn("text-sm font-medium text-bgtext-100")}>No.</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className={`py-1 text-sm text-bgtext-500`}>{row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: "perkWinners",
    header: () => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Username</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-sm font-inter font-light whitespace-nowrap pr-3">
          {row.original.perkWinners.map((winner, index) => (
            <span key={winner.id} className="font-medium">
              {censorString(winner.name)}
              {index < row.original.perkWinners.length - 1
                ? index === row.original.perkWinners.length - 2
                  ? " and "
                  : ", "
                : ""}
            </span>
          ))}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>
            Bonus Reward
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
    cell: ({ row }) => (
      <span className={`py-1 text-sm text-bgtext-500`}>
        {truncateString(row.original.name, 20)}
      </span>
    ),
  },
];

interface BonusRewardTableProps {
  perks: Perks[];
}

export function BonusRewardTable({ perks }: BonusRewardTableProps) {
  return (
    <div className="rounded-md overflow-hidden w-full">
      <DataTable columns={columns} data={perks} />
    </div>
  );
}
