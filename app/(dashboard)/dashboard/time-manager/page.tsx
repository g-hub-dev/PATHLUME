"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Clock,
  Zap,
  Calendar,
  Sparkles,
  ChevronRight,
  Play,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const timeOptions = [
  { value: 15, label: "15 min", description: "Quick session" },
  { value: 30, label: "30 min", description: "Standard" },
  { value: 45, label: "45 min", description: "Extended" },
  { value: 60, label: "1 hour", description: "Deep focus" },
  { value: 90, label: "1.5 hours", description: "Marathon" },
  { value: 120, label: "2 hours", description: "Ultimate" },
]

const optimizedPath = [
  { title: "Quick Recap: Variables", duration: "5 min", type: "review", xp: 15 },
  { title: "Lists Deep Dive", duration: "15 min", type: "lesson", xp: 40 },
  { title: "Practice: List Operations", duration: "10 min", type: "practice", xp: 30 },
]

const weeklySchedule = [
  { day: "Mon", sessions: [{ time: "9:00 AM", duration: 45, topic: "Python Basics" }] },
  { day: "Tue", sessions: [{ time: "6:00 PM", duration: 30, topic: "Data Structures" }] },
  { day: "Wed", sessions: [] },
  { day: "Thu", sessions: [{ time: "7:00 PM", duration: 60, topic: "Functions" }] },
  { day: "Fri", sessions: [{ time: "10:00 AM", duration: 45, topic: "OOP" }] },
  { day: "Sat", sessions: [{ time: "2:00 PM", duration: 90, topic: "Project Work" }] },
  { day: "Sun", sessions: [{ time: "11:00 AM", duration: 30, topic: "Review" }] },
]

export default function TimeManagerPage() {
  const [selectedTime, setSelectedTime] = useState(30)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showOptimized, setShowOptimized] = useState(false)

  const handleOptimize = async () => {
    setIsOptimizing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsOptimizing(false)
    setShowOptimized(true)
  }

  const totalWeeklyMinutes = weeklySchedule.reduce(
    (acc, day) => acc + day.sessions.reduce((a, s) => a + s.duration, 0),
    0
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Smart Time Compression</h1>
        <p className="text-muted-foreground mt-1">
          Optimize your learning based on available time
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Time Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center glow-purple">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">How much time do you have?</h2>
              <p className="text-sm text-muted-foreground">Select your available study time</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {timeOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedTime(option.value)
                  setShowOptimized(false)
                }}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedTime === option.value
                    ? "gradient-primary glow-purple text-white"
                    : "glass hover:border-primary/30"
                }`}
              >
                <div className="text-xl font-bold">{option.label}</div>
                <div className={`text-xs mt-1 ${
                  selectedTime === option.value ? "text-white/80" : "text-muted-foreground"
                }`}>
                  {option.description}
                </div>
              </motion.button>
            ))}
          </div>

          <Button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="w-full gradient-primary text-white glow-purple text-lg py-6"
          >
            {isOptimizing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Zap className="h-5 w-5" />
                </motion.div>
                Optimizing your path...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Optimize My Learning Path
              </>
            )}
          </Button>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI Optimization Tips</h2>
              <p className="text-sm text-muted-foreground">Maximize your learning efficiency</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Best Time to Learn",
                description: "Based on your activity, you learn best between 9-11 AM",
                icon: Clock,
              },
              {
                title: "Optimal Session Length",
                description: "45-minute sessions show 23% better retention for you",
                icon: Target,
              },
              {
                title: "Weekly Goal",
                description: "Aim for 5+ hours/week to maintain momentum",
                icon: TrendingUp,
              },
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3 p-3 glass rounded-xl"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <tip.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{tip.title}</div>
                  <div className="text-xs text-muted-foreground">{tip.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Optimized Path */}
      {showOptimized && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 border-l-4 border-l-primary"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Your Optimized {selectedTime}-Minute Session
              </h2>
              <p className="text-sm text-muted-foreground">
                AI-curated content for maximum learning efficiency
              </p>
            </div>
            <Button className="gradient-primary text-white glow-purple">
              <Play className="mr-2 h-4 w-4" />
              Start Session
            </Button>
          </div>

          <div className="space-y-3">
            {optimizedPath.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/20 transition-all cursor-pointer group"
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-muted text-muted-foreground font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="capitalize">{item.type}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Sparkles className="h-4 w-4" />
                  +{item.xp}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 glass rounded-xl flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total session rewards:</span>
            <div className="flex items-center gap-1 text-primary font-semibold">
              <Sparkles className="h-4 w-4" />
              +{optimizedPath.reduce((acc, item) => acc + item.xp, 0)} XP
            </div>
          </div>
        </motion.div>
      )}

      {/* Weekly Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Weekly Schedule</h2>
              <p className="text-sm text-muted-foreground">
                {Math.round(totalWeeklyMinutes / 60)} hours planned this week
              </p>
            </div>
          </div>
          <Button variant="outline" className="glass border-border/50">
            Edit Schedule
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weeklySchedule.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`p-3 rounded-xl ${
                day.sessions.length > 0 ? "glass" : "bg-muted/30"
              }`}
            >
              <div className="text-center mb-2">
                <div className="text-xs text-muted-foreground">{day.day}</div>
              </div>
              {day.sessions.length > 0 ? (
                day.sessions.map((session, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-muted-foreground">{session.time}</div>
                    <div className="text-sm font-semibold text-primary">{session.duration}m</div>
                    <div className="text-[10px] text-muted-foreground truncate">{session.topic}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-xs text-muted-foreground py-2">
                  Rest day
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
