"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, DollarSign, Search, Users } from "lucide-react"

const EarningsPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-6">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter">My Earnings</h2>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EarningsCard
          icon={<DollarSign className="h-5 w-5" />}
          title="Today's Earnings"
          value="$4,589"
          trend="+7.25%"
          trendUp={true}
        />
        <EarningsCard
          icon={<Users className="h-5 w-5" />}
          title="Total Earnings"
          value="$310"
          trend="+7.25%"
          trendUp={true}
        />
      </div>

      {/* Claim Commission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-linblue-start to-linblue-end p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-bgtext-100 mb-2">Claim Commission</h3>
            <p className="text-3xl font-bold text-bgtext-100">$ 5,000</p>
          </div>
          <div className="h-24 w-24">
            <div className="h-full w-full rounded-full bg-white/20 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-white/30 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-white/50"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-bgtext-900 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-bgtext-100 mb-4">Wallet Address (USDT)</h3>
          <Input
            placeholder="Enter your USDT wallet address"
            className="bg-bgtext-800 border-none text-bgtext-100 mb-4"
          />
          <Button className="bg-linprimary-start hover:bg-linprimary-end text-white w-full rounded-lg">
            <DollarSign className="h-4 w-4 mr-2" />
            Claim Commission
          </Button>
        </div>
      </div>

      {/* Commission & Payout Summary */}
      <div className="bg-bgtext-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-bgtext-100">Commission & Payout Summary</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-bgtext-400" />
              <Input placeholder="Search here" className="pl-9 bg-bgtext-800 border-none text-bgtext-100 rounded-lg" />
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
                <th className="text-left py-2 px-4">Request ID</th>
                <th className="text-left py-2 px-4">Date and Time Joined</th>
                <th className="text-left py-2 px-4">Amount</th>
                <th className="text-left py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#123", date: "05-05-2025 | 14:30:00", amount: "$1,000", status: "Approved" },
                { id: "#123", date: "05-05-2025 | 14:30:00", amount: "$1,000", status: "Pending" },
                { id: "#123", date: "05-05-2025 | 14:30:00", amount: "$1,000", status: "Expired" },
                { id: "#123", date: "05-05-2025 | 14:30:00", amount: "$1,000", status: "Claimed" },
                { id: "#123", date: "05-05-2025 | 14:30:00", amount: "$1,000", status: "Claimed" },
              ].map((transaction, index) => (
                <tr key={index} className="border-t border-bgtext-800">
                  <td className="py-4 px-4 text-bgtext-100">{transaction.id}</td>
                  <td className="py-4 px-4 text-bgtext-100">{transaction.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-linprimary-start"></div>
                      <span className="text-bgtext-100">{transaction.amount}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs ${
                        transaction.status === "Approved"
                          ? "bg-linblue-start/20 text-linblue-start"
                          : transaction.status === "Pending"
                            ? "bg-warning-500/20 text-warning-500"
                            : transaction.status === "Expired"
                              ? "bg-error-500/20 text-error-500"
                              : "bg-success-500/20 text-success-500"
                      }`}
                    >
                      {transaction.status}
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
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md bg-bgtext-800 border-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="icon"
                className={`h-8 w-8 rounded-md ${
                  page === 1 ? "bg-linprimary-start text-white" : "bg-bgtext-800 border-none text-bgtext-100"
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
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md bg-bgtext-800 border-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const EarningsCard = ({ icon, title, value, trend, trendUp }) => {
  return (
    <div className="bg-bgtext-900 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-bgtext-800/30 p-2 rounded-md">{icon}</div>
        <div className={`flex items-center space-x-1 text-xs ${trendUp ? "text-success-500" : "text-error-500"}`}>
          <span>{trendUp ? "↑" : "↓"}</span>
          <span>{trend}</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-bgtext-400">{title}</p>
        <p className="text-2xl font-bold text-bgtext-100">{value}</p>
      </div>
    </div>
  )
}

export default EarningsPage
