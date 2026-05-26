"use client"

import Link from "next/link"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Play, Brain, Zap, Target, Sparkles, BarChart3, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

// Floating particle component
function Particle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/40 rounded-full"
      initial={{
        x: Math.random() * 100 + "%",
        y: "100%",
        opacity: 0,
      }}
      animate={{
        y: "-100%",
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  )
}

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  
  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""))
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current).toLocaleString())
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <span>{displayValue}{suffix}</span>
}

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(y, [-300, 300], [5, -5])
  const rotateY = useTransform(x, [-300, 300], [-5, 5])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          rotate: 360,
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Particle key={i} delay={i * 0.3} />
        ))}
      </div>
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Neural network pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="1" fill="currentColor" />
          <line x1="50" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="50" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#neural)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6 border border-primary/20"
            >
              <motion.span 
                className="h-2 w-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-muted-foreground">AI-Powered Learning Platform</span>
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-balance"
            >
              Learning That{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary glow-text-purple">
                  Adapts to You
                </span>
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 text-pretty"
            >
              Experience personalized education powered by AI. Pathlume analyzes your learning style, 
              identifies gaps, and creates a custom roadmap to help you master any skill faster.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/signup">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    className="gradient-primary text-white glow-purple hover:opacity-90 transition-all group text-base px-8 h-14 relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate My Learning Path
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="glass border-border/50 hover:bg-white/5 hover:border-primary/30 group text-base h-14"
                >
                  <Play className="mr-2 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: "50K", suffix: "+", label: "Active Learners" },
                { value: "95", suffix: "%", label: "Completion Rate" },
                { value: "4.9", suffix: "/5", label: "User Rating" },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center lg:text-left"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - AI Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              mouseX.set(e.clientX - rect.left - rect.width / 2)
              mouseY.set(e.clientY - rect.top - rect.height / 2)
            }}
          >
            <motion.div 
              className="relative aspect-square max-w-lg mx-auto"
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
            >
              {/* Central Brain Icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div 
                  className="h-36 w-36 rounded-full gradient-primary flex items-center justify-center relative"
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)",
                      "0 0 50px rgba(139, 92, 246, 0.6), 0 0 100px rgba(139, 92, 246, 0.3)",
                      "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="h-16 w-16 text-white" />
                  
                  {/* Pulsing rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </motion.div>

              {/* Orbiting Elements */}
              {[
                { icon: Zap, delay: 0, radius: 140, duration: 15, color: "text-accent" },
                { icon: Target, delay: 2, radius: 140, duration: 15, color: "text-primary" },
                { icon: Award, delay: 4, radius: 140, duration: 15, color: "text-success" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay }}
                  style={{ transformOrigin: "0 0" }}
                >
                  <motion.div 
                    className="glass-card rounded-xl p-3 glow-blue -translate-x-1/2 -translate-y-1/2"
                    style={{ marginLeft: item.radius }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </motion.div>
                </motion.div>
              ))}

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.65 0.25 265)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.60 0.20 220)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="28%"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center" }}
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="38%"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="1"
                  strokeDasharray="12 12"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center" }}
                />
              </svg>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-5 left-0 glass-card rounded-xl p-4 max-w-[200px] border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">AI Optimized</span>
                </div>
                <div className="text-lg font-bold text-foreground">+23% faster</div>
                <div className="text-xs text-muted-foreground">learning efficiency</div>
                <div className="h-1.5 rounded-full bg-muted mt-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute top-5 right-0 glass-card rounded-xl p-4 max-w-[180px] border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                <div className="text-lg font-bold text-primary">1,250 XP</div>
                <div className="flex items-center gap-1 text-xs text-success mt-1">
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    ↑
                  </motion.span>
                  +120 from yesterday
                </div>
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/2 -right-4 glass-card rounded-xl p-3 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">45 min/day</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-3 rounded-full bg-primary"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
