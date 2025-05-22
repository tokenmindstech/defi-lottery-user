import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

export default function AgentRecentReferrall() {
  const datalength = 5;

  return (
    <div className="p-2">
      <h3 className="text-xl font-medium text-bgtext-100 mb-4">
        Recent Referrals
      </h3>

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
                <span className="text-bgtext-100 whitespace-nowrap">Name</span>
              </th>
              <th className="p-4 border-r border-bgtext-800 text-left bg-bgtext-900">
                <span className="text-bgtext-100 whitespace-nowrap">
                  Date and Time Joined
                </span>
              </th>
              <th className="p-4 text-left bg-bgtext-900">
                <span className="text-bgtext-100 whitespace-nowrap">
                  Earning
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
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 rounded-full bg-bgtext-800">
                      <AvatarImage src="/placeholder.svg" alt={"John Doe"} />
                      <AvatarFallback>{"John Doe".charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                      John Doe
                    </p>
                  </div>
                </td>
                <td className="p-4 border-r border-bgtext-800">
                  <p className="text-bgtext-500 font-inter text-base whitespace-nowrap">
                    {dayjs().format("DD/MM/YYYY | HH:mm:ss UTC")}
                  </p>
                </td>
                <td className="p-4">
                  <div className="flex flex-row space-x-2 w-full h-full items-center">
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
  );
}
