"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const Header = () => {
  return (
    <header className="h-16 border-b border-bgtext-800 flex items-center justify-between px-4">
      <div className="relative w-[300px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-bgtext-400" />
        <Input placeholder="Search (Ctrl+/)" className="pl-9 bg-bgtext-900 border-none text-bgtext-100 rounded-lg" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-bgtext-900 rounded-lg px-3 py-1">
          <span className="text-bgtext-400">Balance:</span>
          <span className="text-bgtext-100 font-medium">$4,589</span>
        </div>
        <div className="relative">
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-linprimary-start rounded-full flex items-center justify-center text-[10px] text-white">
            3
          </div>
          <button className="bg-bgtext-900 p-2 rounded-lg">
            <Bell className="h-5 w-5 text-bgtext-100" />
          </button>
        </div>
        <Avatar className="h-8 w-8 bg-bgtext-800 cursor-pointer">
          <AvatarImage src="/placeholder.svg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Header
