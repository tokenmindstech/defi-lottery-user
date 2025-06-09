"use client";

import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { cn, truncateString } from "@/lib/utils";
import { DataTable } from "@/components/shared/data-table";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

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
            {dayjs(row.original.date)
              .tz("Asia/Singapore")
              .format("DD/MM/YYYY | HH:mm:ss SGT")}
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
        tomorrow.setDate(tomorrow.getUTCDate() + 1);
        const sgtTomorrow = dayjs(tomorrow).tz("Asia/Singapore").toDate();
        return sgtTomorrow.getDay() === 0 ? "Weekly Draw" : "Daily Draw";
      })(),
      date: (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getUTCDate() + 1);
        tomorrow.setUTCHours(11, 30, 0, 0); // Set to 11:30 AM UTC (which is 7:30 PM SGT)
        return dayjs(tomorrow).tz("Asia/Singapore").toISOString();
      })(),
    },
  ];
  return (
    <div className="rounded-md overflow-hidden w-full">
      <DataTable columns={columns} data={drawPlans} />
    </div>
  );
}
