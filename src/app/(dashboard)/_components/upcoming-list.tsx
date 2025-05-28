"use client";

import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { cn, truncateString } from "@/lib/utils";
import { DataTable } from "@/components/shared/data-table";
interface DrawPlan {
  title: string;
  date: string;
}

// Define columns for the data table
const columns: ColumnDef<DrawPlan>[] = [
  {
    accessorKey: "title",
    header: () => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Title</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {truncateString(row.original.title, 20)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <p className={cn("text-sm font-medium text-bgtext-100")}>Date</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className={`py-1 text-sm text-bgtext-500`}>
            {dayjs(row.original.date).format("DD/MM/YYYY | HH:mm:ss UTC")}
          </span>
        </div>
      );
    },
  },
];

export function UpcomingTable() {
  const drawPlans: DrawPlan[] = [
    {
      title: (() => {
        const tomorrow = new Date();
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1); // Set to tomorrow
        // 0 is Sunday in JavaScript Date
        return tomorrow.getDay() === 0 ? "Weekly Draw" : "Daily Draw";
      })(),
      date: (() => {
        const tomorrow = new Date();
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1); // Set to tomorrow
        tomorrow.setUTCHours(22, 0, 0, 0);
        return tomorrow.toString();
      })(),
    },
  ];
  return (
    <div className="rounded-md overflow-hidden w-full">
      <DataTable columns={columns} data={drawPlans} />
    </div>
  );
}
