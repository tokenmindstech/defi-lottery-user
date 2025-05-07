import React from "react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { CaretRight, CaretLeft } from "@phosphor-icons/react/dist/ssr";

const HistoryClaimReward = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-col w-full h-full space-y-5">
        <h2 className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          Prize History
        </h2>
        <div className="w-full h-full rounded-xl border border-bgtext-800 overflow-x-auto no-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-bgtext-900">
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">No</span>
                </th>
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Name
                  </span>
                </th>
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Date
                  </span>
                </th>
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Status
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base">1</p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                    tck-ja9012kadas901klsd
                  </p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                    {dayjs().format("DD/MM/YYYY | HH:mm:ss EST")}
                  </p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-warning-500 bg-warning-500/40 py-1 px-5 rounded-full w-fit font-inter text-base whitespace-nowrap">
                    Pending
                  </p>
                </td>
              </tr>
              <tr className="">
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base">2</p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                    tck-ja9012kadas901klsd
                  </p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                    {dayjs().format("DD/MM/YYYY | HH:mm:ss EST")}
                  </p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-error-500 bg-error-500/40 py-1 px-5 rounded-full w-fit font-inter text-base whitespace-nowrap">
                    Expired
                  </p>
                </td>
              </tr>
              <tr className="">
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base">3</p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                    tck-ja9012kadas901klsd
                  </p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                    {dayjs().format("DD/MM/YYYY | HH:mm:ss EST")}
                  </p>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-success-500 bg-success-500/40 py-1 px-5 rounded-full w-fit font-inter text-base whitespace-nowrap">
                    Claimed
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full h-full">
        <p className="text-sm text-bgtext-500 font-inter whitespace-nowrap">
          Showing 5 from 1-10
        </p>

        <div className="flex flex-row items-center justify-center space-x-2">
          <Button
            type="button"
            className="bg-bgtext-900 text-bgtext-100 border-2 border-bgtext-800 rounded-xl p-5 cursor-pointer"
          >
            <CaretLeft weight="bold" className="size-5 text-bgtext-100" />
          </Button>
          <Button
            type="button"
            className="bg-bgtext-900 text-bgtext-100 border-2 border-bgtext-800 rounded-xl p-5 cursor-pointer"
          >
            <CaretRight weight="bold" className="size-5 text-bgtext-100" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryClaimReward;
