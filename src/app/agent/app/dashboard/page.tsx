"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, DollarSign, TextIcon as Telegram, TrendingUp, Users } from "lucide-react"

const AgentDashboard = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-medium text-bgtext-100 font-inter">Welcome Alex!</h2>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-bgtext-400">Agent ID</p>
            <p className="text-sm text-bgtext-100">ID : 123123</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-bgtext-400">Joined Date</p>
            <p className="text-sm text-bgtext-100">August 2025</p>
          </div>
        </div>
      </div>

      {/* Copy, Share, and Earn Section */}
      <div className="bg-bgtext-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium text-bgtext-100">Copy, Share, and Earn</h3>
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
              <Input value="DKHIKX123" readOnly className="border-none bg-transparent text-bgtext-100" />
              <Button variant="ghost" className="p-1">
                <Copy className="h-5 w-5 text-bgtext-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-bgtext-900 rounded-xl p-4">
        <h3 className="text-xl font-medium text-bgtext-100 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PerformanceCard
            icon={<DollarSign className="h-5 w-5" />}
            title="Total Earning"
            value="$4,589"
            trend="+7.25%"
            trendUp={true}
            bgGradient="from-linprimary-start to-linprimary-end"
          />
          <PerformanceCard
            icon={<Users className="h-5 w-5" />}
            title="Total Sign Up"
            value="245"
            trend="+1.25%"
            trendUp={false}
            bgGradient="from-bgtext-800 to-bgtext-900"
          />
          <PerformanceCard
            icon={<TrendingUp className="h-5 w-5" />}
            title="Lifetime Value"
            value="$310"
            trend="+7.25%"
            trendUp={true}
            bgGradient="from-bgtext-800 to-bgtext-900"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-bgtext-900 rounded-xl p-4">
          <h3 className="text-xl font-medium text-bgtext-100 mb-2">Referal Growth</h3>
          <p className="text-sm text-bgtext-400 mb-4">Number of Referrals</p>
          <div className="h-48 flex items-end space-x-2">
            {/* Simplified bar chart */}
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((month, index) => (
              <div key={month} className="flex flex-col items-center flex-1">
                <div
                  className={`w-full ${index === 4 ? "bg-linprimary-start" : "bg-bgtext-800"} rounded-t-sm`}
                  style={{
                    height: `${index === 4 ? "100%" : index === 3 ? "80%" : index === 6 ? "60%" : "40%"}`,
                  }}
                ></div>
                <span className="text-xs text-bgtext-400 mt-2">{month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-bgtext-900 rounded-xl p-4">
          <h3 className="text-xl font-medium text-bgtext-100 mb-2">Comission Trend</h3>
          <p className="text-sm text-bgtext-400 mb-4">Earnings</p>
          <div className="h-48 relative">
            {/* Simplified line chart */}
            <div className="absolute right-4 top-0 bg-bgtext-800 rounded-md px-2 py-1 text-xs text-bgtext-100">
              $200
            </div>
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path
                d="M0,50 C20,60 40,30 60,40 C80,50 100,20 120,30 C140,40 160,60 180,50 C200,40 220,20 240,10 C260,0 280,20 300,10"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#33bbf6" />
                  <stop offset="100%" stopColor="#944cff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between mt-2">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((month) => (
                <span key={month} className="text-xs text-bgtext-400">
                  {month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-bgtext-900 rounded-xl p-4">
        <h3 className="text-xl font-medium text-bgtext-100 mb-4">Recent Referrals</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-bgtext-400 text-sm">
                <th className="text-left py-2 px-4">No</th>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Date and Time Joined</th>
                <th className="text-left py-2 px-4">Earning</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "John Doe", date: "05-05-2025 | 14:30:00", earning: "$1,000" },
                { name: "Jean Smith", date: "05-05-2025 | 14:30:00", earning: "$1,000" },
                { name: "Jack Jacob", date: "05-05-2025 | 14:30:00", earning: "$1,000" },
                { name: "Natalie Fernanda", date: "05-05-2025 | 14:30:00", earning: "$1,000" },
                { name: "Alexander Matt", date: "05-05-2025 | 14:30:00", earning: "$1,000" },
              ].map((referral, index) => (
                <tr key={index} className="border-t border-bgtext-800">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8 rounded-full bg-bgtext-800">
                        <AvatarImage src="/placeholder.svg" alt={referral.name} />
                        <AvatarFallback>{referral.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-bgtext-100">{referral.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-bgtext-100">{referral.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-linprimary-start"></div>
                      <span className="text-bgtext-100">{referral.earning}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Training */}
      <div className="bg-bgtext-900 rounded-xl p-4">
        <h3 className="text-xl font-medium text-bgtext-100 mb-4">Recommended Training</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TrainingCard
            title="Crypto Basics 101"
            price="Free Access"
            tag="New"
            bgGradient="from-linblue-start to-linblue-end"
          />
          <TrainingCard title="Crypto Basics" price="$29" bgGradient="from-bgtext-900 to-bgtext-800" />
          <TrainingCard
            title="Advanced Referral Strategies"
            price="$29"
            tag="Popular"
            bgGradient="from-linblue-start to-linblue-end"
          />
        </div>
      </div>
    </section>
  )
}

const PerformanceCard = ({ icon, title, value, trend, trendUp, bgGradient }) => {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} p-4 rounded-xl`}>
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

const TrainingCard = ({ title, price, tag, bgGradient }) => {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} p-4 rounded-xl h-36 relative overflow-hidden`}>
      {tag && (
        <div className="absolute top-2 left-2 bg-bgtext-800/50 text-xs text-bgtext-100 px-2 py-1 rounded-md">{tag}</div>
      )}
      <div className="absolute bottom-4 left-4 right-4">
        <h4 className="text-lg font-medium text-bgtext-100 mb-1">{title}</h4>
        <p className="text-sm text-bgtext-400">{price}</p>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <div className="h-16 w-16 rounded-full bg-white/20"></div>
      </div>
    </div>
  )
}

export default AgentDashboard