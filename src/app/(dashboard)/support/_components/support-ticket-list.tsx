"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { truncateString } from "@/lib/utils";

// Define columns for the data table
const columns: ColumnDef<SupportTicketWithUser>[] = [
  {
    accessorKey: "id",
    header: "Ticket ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex w-28 md:w-24">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {truncateString(id, 12)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      const subject = row.getValue("subject") as string;
      return (
        <div className="flex w-36 md:w-28">
          <span className={`py-1 text-sm text-bgtext-500`}>{subject}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Issue Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return (
        <div className="flex w-36 md:w-28">
          <span className={`py-1 text-sm text-bgtext-500`}>{category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Submitted",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {dayjs(date).format("DD/MM/YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Category",
    cell: ({ row }) => {
      const status = row.getValue("status") as TicketStatusType;
      return (
        <div className="flex">
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              status === "OPEN"
                ? "bg-warning-500/20 text-warning-500"
                : status === "CLOSED"
                ? "bg-error-500/20 text-error-500"
                : "bg-success-500/20 text-success-500"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {dayjs(date).format("DD/MM/YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: () => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="bg-bgtext-900 rounded-full cursor-pointer hover:bg-bgtext-900 text-bgtext-700 hover:text-bgtext-100 ease-out transition-all duration-300"
          >
            <Eye className="size-6 " />
          </Button>
        </div>
      );
    },
  },
];

interface SupportTicketTableProps {
  tickets: SupportTicketWithUser[];
}

export function SupportTicketTable({ tickets }: SupportTicketTableProps) {
  return (
    <div className="rounded-md overflow-hidden w-full">
      <DataTable columns={columns} data={tickets} />
    </div>
  );
}
