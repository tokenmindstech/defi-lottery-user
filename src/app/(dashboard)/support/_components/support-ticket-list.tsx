"use client";

import { Eye } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";

// Define ticket types and status
type TicketStatus = "Resolved" | "Open" | "Closed";

interface SupportTicket {
  id: string;
  subject: string;
  issueCategory: string;
  dateSubmitted: string;
  status: TicketStatus;
  lastUpdate: string;
}

// Sample data matching the screenshot
const tickets: SupportTicket[] = [
  {
    id: "#123123",
    subject: "Can't login",
    issueCategory: "Technical Support",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Resolved",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "Payment issue",
    issueCategory: "Billing",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Open",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "Billing",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Closed",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "General Inquiry",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Resolved",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "Technical Support",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Resolved",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "General Inquiry",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Open",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "Billing",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Closed",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "General Inquiry",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Resolved",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "Billing",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Resolved",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "Billing",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Resolved",
    lastUpdate: new Date().toLocaleDateString(),
  },
  {
    id: "#123123",
    subject: "General question",
    issueCategory: "Billing",
    dateSubmitted: new Date().toLocaleDateString(),
    status: "Open",
    lastUpdate: new Date().toLocaleDateString(),
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
          <span className={`py-1 text-sm`}>{id}</span>
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
          <span className={`py-1 text-sm`}>{subject}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "issueCategory",
    header: "Issue Category",
    cell: ({ row }) => {
      const category = row.getValue("issueCategory") as string;
      return (
        <div className="flex w-36 md:w-28">
          <span className={`py-1 text-sm`}>{category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateSubmitted",
    header: "Date Submitted",
    cell: ({ row }) => {
      const date = row.getValue("dateSubmitted") as string;
      return (
        <div className="flex">
          <span className={`py-1 text-sm`}>
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
      const status = row.getValue("status") as TicketStatus;
      return (
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              status === "Resolved"
                ? "bg-green-500/20 text-green-500"
                : status === "Open"
                ? "bg-yellow-500/20 text-yellow-500"
                : "bg-red-500/20 text-red-500"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
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
            className="text-gray-400 hover:text-white"
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      );
    },
  },
];

export function SupportTicketTable() {
  return (
    <div className="w-full bg-black text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <Input
            placeholder="Search here"
            className="bg-gray-900 border-gray-800 text-gray-400 pl-8"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Select defaultValue="10">
          <SelectTrigger className="w-16 bg-black border-gray-800">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800">
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md overflow-hidden">
        <DataTable columns={columns} data={tickets} />
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-gray-500">Showing 5 from 1-10</div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 border-gray-800 bg-black text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <Button
              key={index}
              variant={page === 1 ? "default" : "outline"}
              size="icon"
              className={`w-8 h-8 ${
                page === 1
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-gray-800 bg-black text-gray-400"
              }`}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 border-gray-800 bg-black text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
