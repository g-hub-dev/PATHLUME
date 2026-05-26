"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/lib/user-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      await login(email, password)
      router.push("/dashboard")
    } catch {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <motion.div 
              className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center glow-purple"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-foreground">Pathlume</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Continue your learning journey where you left off.
            </p>
          </div>

          {/* Social Login */}
          <div className="flex gap-3 mb-6">
            <Button 
              variant="outline" 
              className="flex-1 glass border-border/50 hover:bg-white/5 hover:border-primary/30 transition-all group"
            >
              <Chrome className="h-5 w-5 mr-2 group-hover:text-primary transition-colors" />
              Google
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 glass border-border/50 hover:bg-white/5 hover:border-primary/30 transition-all group"
            >
              <Github className="h-5 w-5 mr-2 group-hover:text-primary transition-colors" />
              GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 glass border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 h-12 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 glass border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 h-12 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-primary text-white glow-purple hover:opacity-90 h-12 text-base relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-muted-foreground mt-6">
            {"Don't have an account? "}
            <Link href="/signup" className="text-primary hover:underline font-medium hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center"
        >
          <div className="glass-card rounded-3xl p-8 max-w-sm mx-auto border border-white/10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-20 w-20 rounded-2xl gradient-primary glow-purple flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Resume Your Journey
            </h2>
            <p className="text-muted-foreground text-sm">
              Your personalized learning path is waiting. Pick up right where you left off and continue mastering new skills.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.div 
                className="glass rounded-xl p-4 hover:border-primary/30 transition-all cursor-default"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </motion.div>
              <motion.div 
                className="glass rounded-xl p-4 hover:border-accent/30 transition-all cursor-default"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl font-bold text-accent">85%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
