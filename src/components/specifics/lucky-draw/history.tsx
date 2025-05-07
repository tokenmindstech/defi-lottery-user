import dayjs from "dayjs";
import React from "react";
import Image from "next/image";
import { CaretRight, CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const HistoryDraw = () => {
  const datalength = 4;
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-col w-full h-full space-y-5">
        <h2 className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          History Draws
        </h2>

        <div
          className="relative w-full rounded-xl border border-bgtext-800 overflow-x-auto no-scrollbar"
          style={{ height: `${56 + datalength * 64}px` }}
        >
          <table className="absolute w-full border-collapse">
            <thead>
              <tr className="bg-bgtext-900">
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">No</span>
                </th>
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Ticket Id
                  </span>
                </th>
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Date
                  </span>
                </th>
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Winning Number
                  </span>
                </th>
                <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Your Numbers
                  </span>
                </th>
                <th className="p-4 text-left bg-bgtext-900">
                  <span className="text-bgtext-100 whitespace-nowrap">
                    Winning Amount
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: datalength }, (_, index) => (
                <tr className="" key={index}>
                  <td className="p-4 border-r border-bgtext-800">
                    <p className="text-bgtext-500 font-inter text-base">
                      {index + 1}
                    </p>
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
                    <div className="flex gap-2 justify-center">
                      {Array.from({ length: 5 }, (_, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center w-8 h-8 bg-gradient-to-b from-linblue-start to-transparent rounded-full border border-bgtext-800"
                        >
                          <span className="text-bgtext-100 text-lg font-bold">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 border-r border-bgtext-800">
                    <div className="flex gap-2 justify-center">
                      {Array.from({ length: 5 }, (_, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center w-8 h-8 bg-gradient-to-b from-linblue-start to-transparent rounded-full border border-bgtext-800"
                        >
                          <span className="text-bgtext-100 text-lg font-bold">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
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
                        }).format(1000)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
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

export default HistoryDraw;
