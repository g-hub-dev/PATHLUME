"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  LayoutDashboard,
  Route,
  ClipboardCheck,
  BarChart3,
  Clock,
  MessageSquare,
  Trophy,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useUser } from "@/lib/user-context"

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Route, label: "Learning Path", href: "/dashboard/learning-path" },
  { icon: ClipboardCheck, label: "Assessment", href: "/dashboard/assessment" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Clock, label: "Time Manager", href: "/dashboard/time-manager" },
  { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
]

const bottomNavItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout, isLoading } = useUser()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Calculate XP progress to next level
  const xpProgress = user ? Math.round((user.xp / user.totalXp) * 100) : 0

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed left-0 top-0 h-screen z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <motion.div 
            className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center glow-purple flex-shrink-0"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold text-sidebar-foreground"
              >
                Pathlume
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* User Stats */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-4 p-4 glass-card rounded-xl overflow-hidden"
          >
            {isLoading ? (
              <div className="animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-muted rounded mb-1" />
                    <div className="h-3 w-16 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ) : user ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <motion.div 
                    className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    {user.initials}
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success border-2 border-sidebar flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">{user.level}</span>
                    </div>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</div>
                    <div className="text-xs text-sidebar-foreground/60">Level {user.level}</div>
                  </div>
                </div>
                
                {/* XP Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-sidebar-foreground/60">XP Progress</span>
                    <span className="text-primary font-medium">{user.xp}/{user.totalXp}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-sidebar-accent overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full gradient-primary rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <motion.div 
                    className="flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-sidebar-foreground">{user.streak} days</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-sidebar-foreground">{user.xp.toLocaleString()} XP</span>
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <Link href="/login" className="text-sm text-primary hover:underline">
                  Sign in to track progress
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed User Avatar */}
      {collapsed && user && (
        <div className="flex justify-center mt-4">
          <motion.div 
            className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold relative"
            whileHover={{ scale: 1.1 }}
          >
            {user.initials}
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success border-2 border-sidebar flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">{user.level}</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground glow-purple"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110", isActive && "text-white")} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && !collapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto h-2 w-2 rounded-full bg-white"
                />
              )}
              {isActive && collapsed && (
                <motion.div
                  layoutId="activeIndicatorCollapsed"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white"
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* AI Mentor Button */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 mb-4"
          >
            <Link
              href="/dashboard/mentor"
              className="flex items-center gap-3 px-4 py-3 glass-card rounded-xl hover:border-primary/30 transition-all group"
            >
              <motion.div 
                className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform"
                animate={{ 
                  boxShadow: ["0 0 20px rgba(139, 92, 246, 0.3)", "0 0 30px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageSquare className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-sidebar-foreground">AI Mentor</div>
                <div className="text-xs text-sidebar-foreground/60">Get instant help</div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {collapsed && (
        <div className="px-4 mb-4">
          <Link
            href="/dashboard/mentor"
            className="flex items-center justify-center p-3 glass-card rounded-xl hover:border-primary/30 transition-all group"
          >
            <motion.div
              animate={{ 
                boxShadow: ["0 0 10px rgba(139, 92, 246, 0.2)", "0 0 20px rgba(139, 92, 246, 0.4)", "0 0 10px rgba(139, 92, 246, 0.2)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-lg"
            >
              <MessageSquare className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            </motion.div>
          </Link>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all group"
          >
            <item.icon className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all group"
        >
          <LogOut className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}
