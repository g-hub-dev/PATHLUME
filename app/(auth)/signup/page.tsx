"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/lib/user-context"

const benefits = [
  { text: "AI-powered personalized learning paths", icon: Sparkles },
  { text: "Track progress with detailed analytics", icon: Zap },
  { text: "24/7 AI mentor support", icon: Sparkles },
  { text: "Gamified learning experience", icon: Zap },
]

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { signup } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    
    setIsLoading(true)
    
    try {
      await signup(name, email, password)
      router.push("/dashboard")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -30, 30],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
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
          className="relative z-10 max-w-md"
        >
          <div className="glass-card rounded-3xl p-8 border border-white/10">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-20 w-20 rounded-2xl gradient-primary glow-purple flex items-center justify-center mb-6"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Start Your Journey Today
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Join thousands of learners who are already mastering new skills with Pathlume.
            </p>
            
            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <motion.div 
                    className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Check className="h-3.5 w-3.5 text-white" />
                  </motion.div>
                  <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">{benefit.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Testimonial */}
            <motion.div 
              className="mt-8 pt-6 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm text-muted-foreground italic mb-4">
                {`"Pathlume helped me learn Python in half the time it would have taken me with traditional methods."`}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                  SC
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Sarah Chen</div>
                  <div className="text-xs text-muted-foreground">Software Developer</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground">
              Start your personalized learning journey today.
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
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 glass border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 h-12 transition-all"
                  required
                />
              </div>
            </div>

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
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with a number and symbol
              </p>
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
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </form>

          {/* Login link */}
          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium hover:text-primary/80 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
