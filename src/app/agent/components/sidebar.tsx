"use client"

import { BarChart3, DollarSign, HelpCircle, Home, LogOut, User, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-[220px] h-screen bg-bgtext-950 border-r border-bgtext-800 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center space-x-2">
        <div className="bg-bgtext-800 p-2 rounded-md">
          <BarChart3 className="h-5 w-5 text-bgtext-100" />
        </div>
        <span className="text-xl font-bold text-bgtext-100">Lottery</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-8 px-4">
        <nav className="space-y-1">
          <NavItem
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            href="/dashboard"
            active={isActive("/dashboard")}
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            label="My Referrals"
            href="/referrals"
            active={isActive("/referrals")}
          />
          <NavItem
            icon={<DollarSign className="h-5 w-5" />}
            label="Commissions"
            href="/earnings"
            active={isActive("/earnings")}
            badge={5}
          />
          <NavItem
            icon={<User className="h-5 w-5" />}
            label="My Profile"
            href="/profile"
            active={isActive("/profile")}
          />
          <NavItem
            icon={<HelpCircle className="h-5 w-5" />}
            label="Support"
            href="/support"
            active={isActive("/support")}
          />
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-bgtext-800">
        <NavItem icon={<LogOut className="h-5 w-5" />} label="Logout" href="/logout" active={false} />
      </div>
    </div>
  )
}

const NavItem = ({ icon, label, href, active, badge }) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
        active ? "bg-linprimary-start text-white" : "text-bgtext-400 hover:bg-bgtext-900 hover:text-bgtext-100"
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <div className="ml-auto bg-white text-linprimary-start text-xs font-medium h-5 min-w-5 rounded-full flex items-center justify-center px-1">
          {badge}
        </div>
      )}
    </Link>
  )
}

export default Sidebar
