"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Search,
  TextIcon as Telegram,
} from "lucide-react";

const ReferralsPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-6">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter">
        My Referrals
      </h2>

      {/* Copy, Share, and Earn Section */}
      <div className="bg-bgtext-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-bgtext-100">
            Copy, Share, and Earn
          </h3>
          <Button className="bg-linprimary-start hover:bg-linprimary-end text-white flex items-center gap-2 rounded-lg">
            <Telegram className="h-4 w-4" />
            <span>Share on Telegram</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-bgtext-400">Referral Link</p>
            <div className="flex items-center bg-bgtext-800 rounded-lg p-3">
              <Input
                value="https://example.com/ref123"
                readOnly
                className="border-none bg-transparent text-bgtext-100"
              />
              <Button variant="ghost" className="p-1">
                <Copy className="h-5 w-5 text-bgtext-100" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-bgtext-400">Referral Code</p>
            <div className="flex items-center bg-bgtext-800 rounded-lg p-3">
              <Input
                value="DKHIKX123"
                readOnly
                className="border-none bg-transparent text-bgtext-100"
              />
              <Button variant="ghost" className="p-1">
                <Copy className="h-5 w-5 text-bgtext-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Referred Users */}
      <div className="bg-bgtext-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-bgtext-100">
            Referred Users
          </h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-bgtext-400" />
              <Input
                placeholder="Search here"
                className="pl-9 bg-bgtext-800 border-none text-bgtext-100 rounded-lg"
              />
            </div>
            <div className="flex items-center space-x-2 bg-bgtext-800 rounded-lg px-3 py-2">
              <span className="text-bgtext-100">10</span>
              <ChevronRight className="h-4 w-4 text-bgtext-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-bgtext-400 text-sm">
                <th className="text-left py-2 px-4">No</th>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Date and Time Joined</th>
                <th className="text-left py-2 px-4">Earning</th>
                <th className="text-left py-2 px-4">Tier</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "John Doe",
                  date: "05-05-2025 | 14:30:00",
                  earning: "$1,000",
                  tier: "Premium",
                },
                {
                  name: "Jean Smith",
                  date: "05-05-2025 | 14:30:00",
                  earning: "$1,000",
                  tier: "No Subscription",
                },
                {
                  name: "Jack Jacob",
                  date: "05-05-2025 | 14:30:00",
                  earning: "$1,000",
                  tier: "Basic",
                },
                {
                  name: "Natalie Fernanda",
                  date: "05-05-2025 | 14:30:00",
                  earning: "$1,000",
                  tier: "Basic",
                },
                {
                  name: "Alexander Matt",
                  date: "05-05-2025 | 14:30:00",
                  earning: "$1,000",
                  tier: "Premium",
                },
              ].map((referral, index) => (
                <tr key={index} className="border-t border-bgtext-800">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8 rounded-full bg-bgtext-800">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={referral.name}
                        />
                        <AvatarFallback>
                          {referral.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-bgtext-100">{referral.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-bgtext-100">{referral.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-linprimary-start"></div>
                      <span className="text-bgtext-100">
                        {referral.earning}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs ${
                        referral.tier === "Premium"
                          ? "bg-linprimary-start/20 text-linprimary-start"
                          : referral.tier === "Basic"
                          ? "bg-linblue-start/20 text-linblue-start"
                          : "bg-bgtext-800 text-bgtext-100"
                      }`}
                    >
                      {referral.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-bgtext-400">Showing 5 from 1-10</div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md bg-bgtext-800 border-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="icon"
                className={`h-8 w-8 rounded-md ${
                  page === 1
                    ? "bg-linprimary-start text-white"
                    : "bg-bgtext-800 border-none text-bgtext-100"
                }`}
              >
                {page}
              </Button>
            ))}
            <span className="text-bgtext-400">...</span>
            {[8, 9, 10].map((page) => (
              <Button
                key={page}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-md bg-bgtext-800 border-none text-bgtext-100"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md bg-bgtext-800 border-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralsPage;
