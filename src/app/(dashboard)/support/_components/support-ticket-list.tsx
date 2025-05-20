"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { Eye, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import PagePagination from "@/components/shared/page-pagination";
import SelectLimitSupport from "./support-select-limit";

// Sample data matching the screenshot
const tickets: SupportTicket[] = [
  {
    id: "#123123",
    subject: "Can't login",
    category: "ACCOUNT",
    status: "RESOLVED",
    description: "I can't login to my account",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "Payment issue",
    category: "BILLING",
    status: "OPEN",
    description: "I'm having an issue with my payment",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    category: "OTHER",
    status: "CLOSED",
    description: "I have a general question about your service",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    category: "TECHNICAL",
    status: "CLOSED",
    description: "I have a general question about your service",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  },
];

// Define columns for the data table
const columns: ColumnDef<SupportTicket>[] = [
  {
    accessorKey: "id",
    header: "Ticket ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex w-28 md:w-24">
          <span className={`py-1 text-sm text-bgtext-500`}>{id}</span>
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

export function SupportTicketTable() {
  return (
    <div className="w-full bg-bgtext-950 p-5 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full h-10 bg-bgtext-900 border-1 border-bgtext-800 rounded-full text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
            StartIcon={MagnifyingGlass}
          />
        </div>
        <SelectLimitSupport />
      </div>

      <div className="rounded-md overflow-hidden">
        <DataTable columns={columns} data={tickets} />
      </div>

      <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
        <p className="text-bgtext-500 text-sm">Showing 5 from 1-10</p>
        <PagePagination currentPage={2} totalPages={10} />
      </div>
    </div>
  );
}
