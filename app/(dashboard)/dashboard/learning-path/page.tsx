"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Video,
  Code,
  FileText,
  CheckCircle2,
  Circle,
  Lock,
  Play,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/progress-ring"

const roadmapData = [
  {
    week: 1,
    title: "Foundation Week",
    description: "Build your programming fundamentals",
    completed: true,
    days: [
      {
        day: 1,
        title: "Introduction to Python",
        status: "completed",
        xp: 50,
        tasks: [
          { type: "video", title: "What is Python?", duration: "15 min", completed: true },
          { type: "reading", title: "Setting Up Your Environment", duration: "10 min", completed: true },
          { type: "code", title: "Your First Python Program", duration: "20 min", completed: true },
        ],
      },
      {
        day: 2,
        title: "Variables & Data Types",
        status: "completed",
        xp: 60,
        tasks: [
          { type: "video", title: "Understanding Variables", duration: "20 min", completed: true },
          { type: "code", title: "Practice: Variable Assignment", duration: "25 min", completed: true },
          { type: "quiz", title: "Quiz: Data Types", duration: "15 min", completed: true },
        ],
      },
      {
        day: 3,
        title: "Control Flow",
        status: "completed",
        xp: 70,
        tasks: [
          { type: "video", title: "If Statements & Conditionals", duration: "25 min", completed: true },
          { type: "code", title: "Practice: Decision Making", duration: "30 min", completed: true },
          { type: "project", title: "Mini Project: Calculator", duration: "45 min", completed: true },
        ],
      },
    ],
  },
  {
    week: 2,
    title: "Data Structures",
    description: "Master essential data structures",
    completed: false,
    days: [
      {
        day: 4,
        title: "Lists & Tuples",
        status: "in-progress",
        xp: 65,
        tasks: [
          { type: "video", title: "Understanding Lists", duration: "20 min", completed: true },
          { type: "code", title: "List Operations", duration: "25 min", completed: false },
          { type: "quiz", title: "Quiz: Lists", duration: "15 min", completed: false },
        ],
      },
      {
        day: 5,
        title: "Dictionaries & Sets",
        status: "locked",
        xp: 70,
        tasks: [
          { type: "video", title: "Working with Dictionaries", duration: "25 min", completed: false },
          { type: "code", title: "Practice: Key-Value Pairs", duration: "30 min", completed: false },
          { type: "project", title: "Build a Contact Book", duration: "45 min", completed: false },
        ],
      },
      {
        day: 6,
        title: "Advanced Collections",
        status: "locked",
        xp: 80,
        tasks: [
          { type: "video", title: "Collections Module", duration: "20 min", completed: false },
          { type: "code", title: "Practice: Deques & Counters", duration: "25 min", completed: false },
          { type: "quiz", title: "Weekly Assessment", duration: "30 min", completed: false },
        ],
      },
    ],
  },
  {
    week: 3,
    title: "Functions & Modules",
    description: "Write reusable code",
    completed: false,
    days: [
      {
        day: 7,
        title: "Function Basics",
        status: "locked",
        xp: 75,
        tasks: [
          { type: "video", title: "Defining Functions", duration: "25 min", completed: false },
          { type: "code", title: "Practice: Parameters & Returns", duration: "30 min", completed: false },
          { type: "quiz", title: "Quiz: Functions", duration: "15 min", completed: false },
        ],
      },
    ],
  },
]

const getTaskIcon = (type: string) => {
  switch (type) {
    case "video":
      return Video
    case "reading":
      return FileText
    case "code":
      return Code
    case "quiz":
      return BookOpen
    case "project":
      return Sparkles
    default:
      return BookOpen
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-6 w-6 text-success" />
    case "in-progress":
      return (
        <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
        </div>
      )
    case "locked":
      return <Lock className="h-6 w-6 text-muted-foreground" />
    default:
      return <Circle className="h-6 w-6 text-muted-foreground" />
  }
}

export default function LearningPathPage() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(2)
  const [expandedDay, setExpandedDay] = useState<number | null>(4)

  const totalDays = roadmapData.reduce((acc, week) => acc + week.days.length, 0)
  const completedDays = roadmapData.reduce(
    (acc, week) => acc + week.days.filter((d) => d.status === "completed").length,
    0
  )
  const progress = Math.round((completedDays / totalDays) * 100)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Learning Path</h1>
          <p className="text-muted-foreground mt-1">
            Data Science Fundamentals - Personalized for you
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="glass border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="gradient-primary text-white glow-purple">
            <Play className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ProgressRing progress={progress} size={120} strokeWidth={10}>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{progress}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </ProgressRing>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-foreground">{completedDays}</div>
              <div className="text-sm text-muted-foreground">Days Completed</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-foreground">{totalDays - completedDays}</div>
              <div className="text-sm text-muted-foreground">Days Remaining</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-primary">785</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-accent">~2 weeks</div>
              <div className="text-sm text-muted-foreground">To Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-4">
        {roadmapData.map((week) => (
          <motion.div
            key={week.week}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: week.week * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {/* Week Header */}
            <button
              onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  week.completed ? "bg-success/20" : "gradient-primary"
                }`}>
                  {week.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : (
                    <span className="text-lg font-bold text-white">{week.week}</span>
                  )}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-foreground">
                    Week {week.week}: {week.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{week.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{week.days.filter((d) => d.status === "completed").length}/{week.days.length} days</span>
                </div>
                {expandedWeek === week.week ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Week Content */}
            <AnimatePresence>
              {expandedWeek === week.week && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border"
                >
                  <div className="p-6 pt-4 space-y-3">
                    {week.days.map((day) => (
                      <div key={day.day}>
                        {/* Day Header */}
                        <button
                          onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                          disabled={day.status === "locked"}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                            day.status === "locked"
                              ? "opacity-50 cursor-not-allowed"
                              : "glass hover:border-primary/20 cursor-pointer"
                          }`}
                        >
                          {/* Timeline Dot */}
                          <div className="relative">
                            {getStatusIcon(day.status)}
                          </div>
                          
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">Day {day.day}:</span>
                              <span className="text-foreground">{day.title}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span>{day.tasks.length} tasks</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Sparkles className="h-3 w-3 text-primary" />
                                <span>{day.xp} XP</span>
                              </div>
                            </div>
                          </div>

                          {day.status !== "locked" && (
                            <ChevronDown
                              className={`h-5 w-5 text-muted-foreground transition-transform ${
                                expandedDay === day.day ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        {/* Day Tasks */}
                        <AnimatePresence>
                          {expandedDay === day.day && day.status !== "locked" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-12 mt-2 space-y-2"
                            >
                              {day.tasks.map((task, taskIndex) => {
                                const TaskIcon = getTaskIcon(task.type)
                                return (
                                  <motion.div
                                    key={taskIndex}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: taskIndex * 0.1 }}
                                    className={`flex items-center gap-4 p-4 rounded-xl ${
                                      task.completed
                                        ? "bg-success/10 border border-success/20"
                                        : "glass hover:border-primary/20"
                                    } cursor-pointer transition-all`}
                                  >
                                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                      task.completed ? "bg-success/20" : "bg-muted"
                                    }`}>
                                      <TaskIcon className={`h-5 w-5 ${
                                        task.completed ? "text-success" : "text-muted-foreground"
                                      }`} />
                                    </div>
                                    <div className="flex-1">
                                      <div className={`font-medium ${
                                        task.completed ? "text-success line-through" : "text-foreground"
                                      }`}>
                                        {task.title}
                                      </div>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{task.duration}</span>
                                      </div>
                                    </div>
                                    {task.completed ? (
                                      <CheckCircle2 className="h-5 w-5 text-success" />
                                    ) : (
                                      <Button size="sm" className="gradient-primary text-white">
                                        Start
                                      </Button>
                                    )}
                                  </motion.div>
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
