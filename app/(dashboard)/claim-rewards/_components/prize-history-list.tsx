"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { cn, truncateString } from "@/lib/utils";
import {
  SortAscendingIcon,
  SortDescendingIcon,
} from "@phosphor-icons/react/dist/ssr";
import { DataTable } from "@/components/shared/data-table";
import Link from "next/link";
import Image from "next/image";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

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
            {dayjs(row.original.claimedAt)
              .tz("Asia/Singapore")
              .format("DD/MM/YYYY | HH:mm:ss SGT")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "drawTicket",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>
            Your Numbers
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
      const winningNumbers = row.original.drawTicket.rewardDraw
        ? row.original.drawTicket.rewardDraw.drawNumbers.split(" ")
        : [];
      const yourNumbers = row.original.drawTicket.drawNumbers.split(" ");
      return (
        <div className="flex gap-2 justify-center">
          {yourNumbers.map((number, index) => {
            const isWinningNumber = winningNumbers.includes(number);
            return (
              <div
                key={index}
                className={`flex items-center justify-center w-8 h-8 ${
                  isWinningNumber
                    ? "bg-gradient-to-b from-linprimary-start to-transparent"
                    : "bg-bgtext-900"
                } rounded-full border border-bgtext-800`}
              >
                <span className="text-bgtext-100 text-lg font-bold">
                  {number}
                </span>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "winningAmount",
    header: "Winning Amount",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row space-x-2 w-full h-full items-center justify-center">
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
            }).format(row.original.drawTicket.amount)}
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
