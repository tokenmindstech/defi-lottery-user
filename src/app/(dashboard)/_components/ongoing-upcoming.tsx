import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardOngoingUpcoming = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card className="bg-bgtext-950 border border-bgtext-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Ongoing Draws
            </CardTitle>
            <CardDescription className="hidden text-bgtext-600 font-inter text-sm font-normal">
              View you lottery ticket statistics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full h-full">
          <div className="border border-bgtext-800 rounded-xl overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-bgtext-900">
                  <th className="p-4 text-left border-r border-bgtext-800 bg-bgtext-900">
                    <span className="text-bgtext-100">Title</span>
                  </th>
                  <th className="p-4 text-left bg-bgtext-900">
                    <span className="text-bgtext-100">Time</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black">
                <tr>
                  <td className="p-4 border-r border-bgtext-800">
                    <p className="text-bgtext-500 font-inter text-base">
                      Draw 1 ABCDE
                    </p>
                  </td>
                  <td className="p-4 border-r border-bgtext-800">
                    <p className="text-bgtext-500 font-inter text-base">
                      2023-10-01 12:00:00
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bgtext-950 border border-bgtext-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Upcoming Draws
            </CardTitle>
            <CardDescription className="hidden text-bgtext-600 font-inter text-sm font-normal">
              View you lottery ticket statistics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full h-full">
          <div className="border border-bgtext-800 rounded-xl overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-bgtext-900">
                  <th className="p-4 text-left border-r border-bgtext-800 bg-bgtext-900">
                    <span className="text-bgtext-100">Title</span>
                  </th>
                  <th className="p-4 text-left bg-bgtext-900">
                    <span className="text-bgtext-100">Time</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black">
                <tr>
                  <td className="p-4 border-r border-bgtext-800">
                    <p className="text-bgtext-500 font-inter text-base">
                      Draw 1 ABCDE
                    </p>
                  </td>
                  <td className="p-4 border-r border-bgtext-800">
                    <p className="text-bgtext-500 font-inter text-base">
                      2023-10-01 12:00:00
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOngoingUpcoming;
