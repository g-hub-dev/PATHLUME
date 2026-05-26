"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Target, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  Trophy,
  BarChart3
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Our advanced AI analyzes your learning patterns and creates personalized curricula that adapt in real-time.",
    gradient: "from-primary to-primary/50",
  },
  {
    icon: Target,
    title: "Diagnostic Assessment",
    description: "Take skill assessments that identify your strengths and pinpoint exactly where you need improvement.",
    gradient: "from-accent to-accent/50",
  },
  {
    icon: Sparkles,
    title: "Adaptive Roadmaps",
    description: "Get a custom learning path that evolves with your progress, ensuring you never waste time on what you already know.",
    gradient: "from-primary to-accent",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Track your growth with detailed analytics, weakness heatmaps, and performance insights.",
    gradient: "from-success to-success/50",
  },
  {
    icon: Clock,
    title: "Smart Time Compression",
    description: "Tell us how much time you have, and we will optimize your learning path to maximize efficiency.",
    gradient: "from-warning to-warning/50",
  },
  {
    icon: MessageSquare,
    title: "AI Mentor Chatbot",
    description: "Get instant help from your personal AI tutor, available 24/7 to answer questions and provide guidance.",
    gradient: "from-info to-info/50",
  },
  {
    icon: Trophy,
    title: "Gamification System",
    description: "Earn XP, unlock achievements, maintain streaks, and compete on leaderboards to stay motivated.",
    gradient: "from-primary to-accent",
  },
  {
    icon: BarChart3,
    title: "Weakness Heatmap",
    description: "Visualize your knowledge gaps with color-coded heatmaps showing weak, moderate, and strong areas.",
    gradient: "from-destructive to-warning",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Features() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Master Any Skill
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Pathlume combines cutting-edge AI technology with proven learning methodologies 
            to create the most effective personalized learning experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
