"use client"

import { motion } from "framer-motion"
import {
  Flame,
  Target,
  TrendingUp,
  Clock,
  BookOpen,
  Sparkles,
  ChevronRight,
  Play,
  CheckCircle2,
  Circle,
  Bell,
  Zap,
  Brain,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import Link from "next/link"
import { useUser } from "@/lib/user-context"

const dailyGoals = [
  { id: 1, title: "Complete Python Basics Module", xp: 50, completed: true },
  { id: 2, title: "Practice 3 coding challenges", xp: 30, completed: true },
  { id: 3, title: "Watch video on Data Structures", xp: 25, completed: false },
  { id: 4, title: "Quiz: Arrays & Lists", xp: 40, completed: false },
]

const upcomingLessons = [
  { id: 1, title: "Introduction to Machine Learning", duration: "45 min", type: "Video", progress: 0 },
  { id: 2, title: "Linear Regression Basics", duration: "30 min", type: "Reading", progress: 0 },
  { id: 3, title: "Hands-on: Build Your First Model", duration: "60 min", type: "Project", progress: 0 },
]

const recentActivity = [
  { id: 1, action: "Completed", item: "Python Functions Quiz", xp: 45, time: "2 hours ago" },
  { id: 2, action: "Started", item: "Data Science Path", xp: 0, time: "3 hours ago" },
  { id: 3, action: "Earned badge", item: "Quick Learner", xp: 100, time: "Yesterday" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  
  const completedGoals = dailyGoals.filter(g => g.completed).length
  const totalGoals = dailyGoals.length
  const progressPercentage = Math.round((completedGoals / totalGoals) * 100)

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Learner'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {user?.streak && user.streak > 0 
              ? `${user.streak} day streak! Keep up the momentum!`
              : "Start your learning journey today!"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="icon" className="relative glass border-border/50 hover:border-primary/30">
              <Bell className="h-5 w-5" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-white"
              >
                3
              </motion.span>
            </Button>
          </motion.div>
          <Link href="/dashboard/learning-path">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="gradient-primary text-white glow-purple group">
                Continue Learning
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            icon: Flame, 
            label: "Day Streak", 
            value: user?.streak?.toString() || "0", 
            sublabel: `Best: ${user?.bestStreak || 0} days`, 
            color: "text-orange-500", 
            gradient: "from-orange-500/20" 
          },
          { 
            icon: Zap, 
            label: "Total XP", 
            value: user?.xp?.toLocaleString() || "0", 
            sublabel: "+120 today", 
            color: "text-primary", 
            gradient: "from-primary/20" 
          },
          { 
            icon: Target, 
            label: "Goals Completed", 
            value: `${completedGoals}/${totalGoals}`, 
            sublabel: `${progressPercentage}% done`, 
            color: "text-success", 
            gradient: "from-success/20" 
          },
          { 
            icon: Clock, 
            label: "Time Learned", 
            value: `${user?.stats?.hoursLearned || 0}h`, 
            sublabel: "This week", 
            color: "text-accent", 
            gradient: "from-accent/20" 
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass-card rounded-2xl p-5 hover:border-primary/20 transition-all cursor-default group"
          >
            <div className="flex items-start justify-between">
              <motion.div 
                className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} to-transparent group-hover:scale-110 transition-transform`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </motion.div>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground/70 mt-1">{stat.sublabel}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Goals */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Daily Goals</h2>
                <p className="text-sm text-muted-foreground">Complete your tasks to earn XP</p>
              </div>
              <ProgressRing progress={progressPercentage} size={60} strokeWidth={5}>
                <span className="text-sm font-bold text-foreground">{progressPercentage}%</span>
              </ProgressRing>
            </div>
            <div className="space-y-3">
              {dailyGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    goal.completed
                      ? "bg-success/10 border border-success/20"
                      : "glass hover:border-primary/20"
                  }`}
                >
                  <motion.button 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </motion.button>
                  <div className="flex-1">
                    <div className={`font-medium ${goal.completed ? "text-success line-through" : "text-foreground"}`}>
                      {goal.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">+{goal.xp} XP</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div variants={itemVariants}>
          <div className="glass-card rounded-2xl p-6 h-full">
            <h2 className="text-lg font-semibold text-foreground mb-6">Current Path Progress</h2>
            <div className="flex flex-col items-center">
              <ProgressRing progress={user?.currentPath?.progress || 68} size={140} strokeWidth={10}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{user?.currentPath?.progress || 68}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </ProgressRing>
              <div className="mt-6 text-center">
                <div className="text-sm font-medium text-foreground">{user?.currentPath?.name || "Data Science Fundamentals"}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {user?.currentPath?.modulesCompleted || 17} of {user?.currentPath?.totalModules || 25} modules completed
                </div>
              </div>
              <Link href="/dashboard/learning-path" className="w-full mt-6">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full gradient-primary text-white group">
                    View Roadmap
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Lessons */}
        <motion.div variants={itemVariants}>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Up Next</h2>
                <p className="text-sm text-muted-foreground">Continue your learning journey</p>
              </div>
              <Link href="/dashboard/learning-path">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/20 transition-all group cursor-pointer"
                >
                  <motion.div 
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      index === 0 ? "gradient-primary glow-purple" : "bg-muted"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {index === 0 ? (
                      <Play className="h-5 w-5 text-white" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    )}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">{lesson.title}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{lesson.type}</span>
                      <span>•</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                <p className="text-sm text-muted-foreground">Your learning history</p>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-primary"
                    whileHover={{ scale: 1.5 }}
                  />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.item}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  {activity.xp > 0 && (
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      +{activity.xp}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div variants={itemVariants}>
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-primary relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="flex items-start gap-4 relative z-10">
            <motion.div 
              className="p-3 rounded-xl gradient-primary glow-purple flex-shrink-0"
              animate={{ 
                boxShadow: ["0 0 20px rgba(139, 92, 246, 0.3)", "0 0 40px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="h-6 w-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">
                  AI-Powered Recommendation
                </h3>
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                  Personalized
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Based on your recent quiz performance, we recommend focusing on 
                &quot;Data Structures&quot; before moving to advanced topics. We have added 
                2 practice modules to strengthen your understanding.
              </p>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="sm" className="gradient-primary text-white group">
                    View Changes
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Brain, label: "AI Mentor", href: "/dashboard/mentor", color: "from-primary/20" },
            { icon: ClipboardCheck, label: "Take Quiz", href: "/dashboard/assessment", color: "from-accent/20" },
            { icon: Award, label: "Achievements", href: "/dashboard/achievements", color: "from-success/20" },
            { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", color: "from-warning/20" },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card rounded-xl p-4 hover:border-primary/20 transition-all cursor-pointer group bg-gradient-to-br ${action.color} to-transparent`}
              >
                <action.icon className="h-6 w-6 text-foreground mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-medium text-foreground">{action.label}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Import icons used in quick actions
import { ClipboardCheck, BarChart3 } from "lucide-react"
