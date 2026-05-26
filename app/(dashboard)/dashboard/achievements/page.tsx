"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Trophy,
  Flame,
  Target,
  Zap,
  Star,
  Award,
  Crown,
  Rocket,
  BookOpen,
  Code,
  Brain,
  Clock,
  Lock,
  Sparkles,
  TrendingUp,
  Gift,
  PartyPopper,
} from "lucide-react"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { Button } from "@/components/ui/button"
import { useUser } from "@/lib/user-context"

const badges = [
  { id: 1, name: "First Steps", description: "Complete your first lesson", icon: Rocket, earned: true, xp: 50, date: "Jan 15", rarity: "common" },
  { id: 2, name: "Quick Learner", description: "Complete 5 lessons in one day", icon: Zap, earned: true, xp: 100, date: "Jan 18", rarity: "uncommon" },
  { id: 3, name: "Week Warrior", description: "Maintain a 7-day streak", icon: Flame, earned: true, xp: 150, date: "Jan 22", rarity: "uncommon" },
  { id: 4, name: "Quiz Master", description: "Score 100% on any quiz", icon: Target, earned: true, xp: 100, date: "Jan 25", rarity: "rare" },
  { id: 5, name: "Code Ninja", description: "Complete 10 coding challenges", icon: Code, earned: true, xp: 200, date: "Feb 1", rarity: "rare" },
  { id: 6, name: "Bookworm", description: "Read 20 learning materials", icon: BookOpen, earned: false, progress: 15, total: 20, xp: 150, rarity: "uncommon" },
  { id: 7, name: "Brain Power", description: "Complete all assessments", icon: Brain, earned: false, progress: 3, total: 5, xp: 300, rarity: "epic" },
  { id: 8, name: "Time Master", description: "Study for 50 total hours", icon: Clock, earned: false, progress: 32, total: 50, xp: 250, rarity: "rare" },
  { id: 9, name: "Champion", description: "Reach the top 10 on leaderboard", icon: Crown, earned: false, progress: 0, total: 1, xp: 500, rarity: "legendary" },
  { id: 10, name: "Legend", description: "Complete an entire learning path", icon: Star, earned: false, progress: 68, total: 100, xp: 1000, rarity: "legendary" },
]

const dailyRewards = [
  { day: 1, xp: 10, claimed: true },
  { day: 2, xp: 15, claimed: true },
  { day: 3, xp: 20, claimed: true },
  { day: 4, xp: 25, claimed: false, isToday: true },
  { day: 5, xp: 30, claimed: false },
  { day: 6, xp: 40, claimed: false },
  { day: 7, xp: 100, claimed: false, isBonus: true },
]

const rarityColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  common: { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30", glow: "" },
  uncommon: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30", glow: "" },
  rare: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-blue-500/20" },
  epic: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/30" },
  legendary: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30", glow: "shadow-yellow-500/40" },
}

export default function AchievementsPage() {
  const { user } = useUser()
  const [claimAnimation, setClaimAnimation] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState<typeof badges[0] | null>(null)
  
  const earnedBadges = badges.filter((b) => b.earned).length
  const totalBadges = badges.length
  
  const levelInfo = {
    current: user?.level || 12,
    title: user?.level && user.level >= 20 ? "Expert" : user?.level && user.level >= 10 ? "Apprentice" : "Beginner",
    currentXP: user?.xp || 2450,
    nextLevelXP: user?.totalXp || 3000,
    totalXP: user?.xp || 8920,
  }
  
  const progress = (levelInfo.currentXP / levelInfo.nextLevelXP) * 100

  // Generate dynamic leaderboard with user's position
  const leaderboard = [
    { rank: 1, name: "Alex Thompson", xp: 12450, avatar: "AT", streak: 45 },
    { rank: 2, name: "Sarah Chen", xp: 11200, avatar: "SC", streak: 38 },
    { rank: 3, name: "Mike Johnson", xp: 10890, avatar: "MJ", streak: 32 },
    { rank: 4, name: "Emily Davis", xp: 9750, avatar: "ED", streak: 28 },
    { rank: 5, name: user?.name || "You", xp: user?.xp || 8920, avatar: user?.initials || "YO", streak: user?.streak || 15, isUser: true },
    { rank: 6, name: "Lisa Wang", xp: 8540, avatar: "LW", streak: 21 },
    { rank: 7, name: "Chris Brown", xp: 7890, avatar: "CB", streak: 19 },
  ]

  const handleClaimReward = () => {
    setClaimAnimation(true)
    setTimeout(() => setClaimAnimation(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Claim Animation Overlay */}
      <AnimatePresence>
        {claimAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="inline-block"
              >
                <PartyPopper className="h-24 w-24 text-primary mx-auto mb-4" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-2">+25 XP Claimed!</h2>
                <p className="text-muted-foreground">Keep up the streak!</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground mt-1">
            Track your accomplishments and climb the ranks
          </p>
        </div>
        <div className="flex items-center gap-4">
          <motion.div 
            className="glass-card rounded-xl px-4 py-2 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">{earnedBadges}/{totalBadges}</span>
            <span className="text-sm text-muted-foreground">Badges</span>
          </motion.div>
          <motion.div 
            className="glass-card rounded-xl px-4 py-2 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-semibold text-foreground">{levelInfo.totalXP.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">Total XP</span>
          </motion.div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="flex flex-col items-center text-center relative z-10">
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.2)",
                  "0 0 40px rgba(139, 92, 246, 0.4)",
                  "0 0 20px rgba(139, 92, 246, 0.2)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full"
            >
              <ProgressRing progress={progress} size={140} strokeWidth={10}>
                <div className="text-center">
                  <motion.div 
                    className="text-3xl font-bold text-foreground"
                    key={levelInfo.current}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {levelInfo.current}
                  </motion.div>
                  <div className="text-xs text-muted-foreground">Level</div>
                </div>
              </ProgressRing>
            </motion.div>
            <h3 className="text-xl font-bold text-foreground mt-4">{levelInfo.title}</h3>
            <div className="flex items-center gap-1 mt-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {levelInfo.currentXP.toLocaleString()} / {levelInfo.nextLevelXP.toLocaleString()} XP
              </span>
            </div>
            
            {/* XP to next level indicator */}
            <motion.div 
              className="mt-4 px-4 py-2 glass rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-foreground">
                {(levelInfo.nextLevelXP - levelInfo.currentXP).toLocaleString()} XP to Level {levelInfo.current + 1}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Daily Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Daily Streak Rewards</h3>
              <p className="text-sm text-muted-foreground">Log in daily to earn bonus XP</p>
            </div>
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-bold text-orange-500">{user?.streak || 15} day streak</span>
            </motion.div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dailyRewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`relative flex flex-col items-center p-3 rounded-xl transition-all cursor-pointer ${
                  reward.claimed
                    ? "bg-success/20 border border-success/30"
                    : reward.isToday
                    ? "gradient-primary glow-purple"
                    : "glass hover:border-primary/30"
                }`}
                onClick={() => reward.isToday && handleClaimReward()}
              >
                {reward.isBonus && (
                  <motion.div 
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                )}
                <span className={`text-xs ${reward.isToday ? "text-white" : "text-muted-foreground"}`}>
                  Day {reward.day}
                </span>
                <motion.div 
                  className={`my-2 ${reward.claimed ? "text-success" : reward.isToday ? "text-white" : "text-primary"}`}
                  animate={reward.isToday ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {reward.claimed ? (
                    <Award className="h-6 w-6" />
                  ) : reward.isToday ? (
                    <Gift className="h-6 w-6" />
                  ) : (
                    <Sparkles className="h-6 w-6" />
                  )}
                </motion.div>
                <span className={`text-sm font-semibold ${reward.isToday ? "text-white" : "text-foreground"}`}>
                  +{reward.xp}
                </span>
                {reward.isToday && (
                  <span className="text-[10px] text-white/80 mt-1">Click to claim!</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Badges Collection</h3>
            <div className="flex gap-2">
              {Object.entries(rarityColors).map(([rarity, colors]) => (
                <span 
                  key={rarity} 
                  className={`text-[10px] px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} capitalize`}
                >
                  {rarity}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => {
              const colors = rarityColors[badge.rarity]
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setSelectedBadge(badge)}
                  className={`relative p-4 rounded-xl border cursor-pointer group transition-all ${
                    badge.earned
                      ? `${colors.bg} ${colors.border} hover:shadow-lg ${colors.glow}`
                      : "glass opacity-60 hover:opacity-80"
                  }`}
                >
                  {/* Rarity indicator */}
                  <span className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} capitalize`}>
                    {badge.rarity}
                  </span>
                  
                  {!badge.earned && (
                    <div className="absolute top-2 left-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  
                  <motion.div 
                    className={`h-14 w-14 rounded-xl flex items-center justify-center mb-3 ${
                      badge.earned ? "gradient-primary" : "bg-muted"
                    }`}
                    animate={badge.earned ? { 
                      boxShadow: [
                        "0 0 0 rgba(139, 92, 246, 0)",
                        "0 0 20px rgba(139, 92, 246, 0.3)",
                        "0 0 0 rgba(139, 92, 246, 0)",
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <badge.icon className={`h-7 w-7 ${badge.earned ? "text-white" : "text-muted-foreground"}`} />
                  </motion.div>
                  
                  <h4 className="font-semibold text-foreground text-sm">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{badge.description}</p>
                  
                  {badge.earned ? (
                    <div className="flex items-center gap-1 mt-3 text-xs text-success">
                      <Award className="h-3 w-3" />
                      <span>Earned {badge.date}</span>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full gradient-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((badge.progress || 0) / (badge.total || 1)) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {badge.progress}/{badge.total}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                    <Sparkles className="h-3 w-3" />
                    <span>+{badge.xp} XP</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Leaderboard</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {leaderboard.map((leaderUser, index) => (
              <motion.div
                key={leaderUser.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                  leaderUser.isUser
                    ? "bg-primary/20 border border-primary/30 glow-purple"
                    : "glass hover:border-primary/20"
                }`}
              >
                {/* Rank */}
                <motion.div 
                  className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    leaderUser.rank === 1
                      ? "bg-yellow-500/20 text-yellow-500"
                      : leaderUser.rank === 2
                      ? "bg-gray-400/20 text-gray-400"
                      : leaderUser.rank === 3
                      ? "bg-orange-500/20 text-orange-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                  animate={leaderUser.rank <= 3 ? { 
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: leaderUser.rank * 0.2 }}
                >
                  {leaderUser.rank <= 3 ? (
                    <Crown className="h-4 w-4" />
                  ) : (
                    leaderUser.rank
                  )}
                </motion.div>
                
                {/* Avatar & Name */}
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                  leaderUser.isUser ? "gradient-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {leaderUser.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium truncate ${leaderUser.isUser ? "text-primary" : "text-foreground"}`}>
                    {leaderUser.name}
                    {leaderUser.isUser && <span className="text-xs ml-2 opacity-70">(You)</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span>{leaderUser.streak} day streak</span>
                  </div>
                </div>
                
                {/* XP */}
                <div className="text-right">
                  <div className="font-bold text-foreground">{leaderUser.xp.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">XP</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Your position indicator */}
          <motion.div 
            className="mt-4 p-3 glass rounded-xl flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm text-muted-foreground">Your position</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">#5</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                +2 this week
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={selectedBadge.earned ? { 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 0.5 }}
                className={`h-24 w-24 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  selectedBadge.earned ? "gradient-primary glow-purple" : "bg-muted"
                }`}
              >
                <selectedBadge.icon className={`h-12 w-12 ${selectedBadge.earned ? "text-white" : "text-muted-foreground"}`} />
              </motion.div>
              
              <span className={`text-xs px-3 py-1 rounded-full ${rarityColors[selectedBadge.rarity].bg} ${rarityColors[selectedBadge.rarity].text} capitalize`}>
                {selectedBadge.rarity}
              </span>
              
              <h2 className="text-2xl font-bold text-foreground mt-4">{selectedBadge.name}</h2>
              <p className="text-muted-foreground mt-2">{selectedBadge.description}</p>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-primary">
                <Sparkles className="h-5 w-5" />
                <span className="text-lg font-bold">+{selectedBadge.xp} XP</span>
              </div>
              
              {selectedBadge.earned ? (
                <p className="text-success mt-4">Earned on {selectedBadge.date}</p>
              ) : (
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full"
                      style={{ width: `${((selectedBadge.progress || 0) / (selectedBadge.total || 1)) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedBadge.progress}/{selectedBadge.total} completed
                  </p>
                </div>
              )}
              
              <Button 
                className="mt-6 gradient-primary text-white"
                onClick={() => setSelectedBadge(null)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
