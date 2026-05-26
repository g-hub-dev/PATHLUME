"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Sparkles,
  BarChart3,
  Calendar,
} from "lucide-react"
import { ProgressRing } from "@/components/dashboard/progress-ring"

// Heatmap data for topics
const weaknessHeatmap = [
  { topic: "Python Basics", score: 92, trend: "up" },
  { topic: "Variables & Types", score: 88, trend: "up" },
  { topic: "Control Flow", score: 75, trend: "up" },
  { topic: "Lists & Arrays", score: 68, trend: "stable" },
  { topic: "Dictionaries", score: 45, trend: "down" },
  { topic: "Functions", score: 82, trend: "up" },
  { topic: "OOP Concepts", score: 35, trend: "down" },
  { topic: "File Handling", score: 55, trend: "stable" },
  { topic: "Error Handling", score: 60, trend: "up" },
  { topic: "Modules", score: 72, trend: "stable" },
]

const weeklyActivity = [
  { day: "Mon", hours: 2.5, xp: 150 },
  { day: "Tue", hours: 1.8, xp: 95 },
  { day: "Wed", hours: 3.2, xp: 210 },
  { day: "Thu", hours: 2.0, xp: 120 },
  { day: "Fri", hours: 1.5, xp: 85 },
  { day: "Sat", hours: 4.0, xp: 280 },
  { day: "Sun", hours: 2.8, xp: 175 },
]

const monthlyProgress = [
  { week: "Week 1", completed: 8, total: 10 },
  { week: "Week 2", completed: 7, total: 10 },
  { week: "Week 3", completed: 9, total: 10 },
  { week: "Week 4", completed: 5, total: 10 },
]

const getHeatmapColor = (score: number) => {
  if (score >= 80) return "bg-success"
  if (score >= 60) return "bg-warning"
  return "bg-destructive"
}

const getHeatmapBgColor = (score: number) => {
  if (score >= 80) return "bg-success/20"
  if (score >= 60) return "bg-warning/20"
  return "bg-destructive/20"
}

export default function AnalyticsPage() {
  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours))
  const totalHours = weeklyActivity.reduce((acc, d) => acc + d.hours, 0)
  const totalXP = weeklyActivity.reduce((acc, d) => acc + d.xp, 0)
  const avgScore = Math.round(weaknessHeatmap.reduce((acc, t) => acc + t.score, 0) / weaknessHeatmap.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning progress and identify areas for improvement
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Weekly Hours", value: `${totalHours.toFixed(1)}h`, sublabel: "+2.3h from last week", trend: "up" },
          { icon: Sparkles, label: "Weekly XP", value: totalXP.toString(), sublabel: "+340 from last week", trend: "up" },
          { icon: Target, label: "Avg. Score", value: `${avgScore}%`, sublabel: "+5% improvement", trend: "up" },
          { icon: BarChart3, label: "Modules Done", value: "29", sublabel: "of 42 total", trend: "stable" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-primary" />
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : stat.trend === "down" ? (
                <TrendingDown className="h-4 w-4 text-destructive" />
              ) : null}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground/70 mt-1">{stat.sublabel}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weakness Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Skill Heatmap</h2>
              <p className="text-sm text-muted-foreground">Your proficiency by topic</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-success" />
                <span className="text-muted-foreground">Strong</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-warning" />
                <span className="text-muted-foreground">Moderate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-destructive" />
                <span className="text-muted-foreground">Weak</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {weaknessHeatmap.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`flex items-center gap-4 p-3 rounded-xl ${getHeatmapBgColor(topic.score)}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground truncate">
                      {topic.topic}
                    </span>
                    <div className="flex items-center gap-2">
                      {topic.trend === "up" && <TrendingUp className="h-3 w-3 text-success" />}
                      {topic.trend === "down" && <TrendingDown className="h-3 w-3 text-destructive" />}
                      <span className="text-sm font-semibold text-foreground">{topic.score}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-background/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.score}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                      className={`h-full rounded-full ${getHeatmapColor(topic.score)}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Weekly Activity</h2>
              <p className="text-sm text-muted-foreground">Hours spent learning</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  className="w-full rounded-t-lg gradient-primary relative group cursor-pointer min-h-[20px]"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                    {day.hours}h • {day.xp} XP
                  </div>
                </motion.div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-foreground">{totalHours.toFixed(1)}h</div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-primary">{totalXP}</div>
              <div className="text-xs text-muted-foreground">XP Earned</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Monthly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Monthly Progress</h2>
            <p className="text-sm text-muted-foreground">Modules completed per week</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {monthlyProgress.map((week, index) => {
            const percentage = Math.round((week.completed / week.total) * 100)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <ProgressRing progress={percentage} size={100} strokeWidth={8}>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{week.completed}</div>
                    <div className="text-[10px] text-muted-foreground">of {week.total}</div>
                  </div>
                </ProgressRing>
                <span className="mt-3 text-sm font-medium text-foreground">{week.week}</span>
                <span className="text-xs text-muted-foreground">{percentage}% complete</span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
