"use client"

import { motion } from "framer-motion"
import { Settings, Shield, Sliders, Cpu, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Core Configurations</h1>
        <p className="text-muted-foreground mt-1">Manage system vectors, environment keys, and display telemetry.</p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-border/40 pb-4">
          <Sliders className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">UI Preferences</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Cyberpunk Glow Matrices</p>
            <p className="text-xs text-muted-foreground">Toggle high-intensity neon neon shadows and visual bloom wrappers.</p>
          </div>
          <div className="h-6 w-11 bg-primary rounded-full p-0.5 cursor-pointer flex justify-end">
            <div className="h-5 w-5 bg-white rounded-full shadow-md" />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-border/40 pb-4">
          <Cpu className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-bold text-foreground">AI Integration Engine</h3>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Gemini API Key Coordinates</label>
          <input 
            type="password" 
            value="••••••••••••••••••••••••••••••••••••" 
            disabled 
            className="w-full bg-slate-900/60 border border-border/60 rounded-xl px-4 py-3 text-muted-foreground text-sm cursor-not-allowed"
          />
          <p className="text-[11px] text-muted-foreground mt-2">Sourced dynamically from your local system environment matrix (`.env.local`).</p>
        </div>
      </div>

      <Button className="gradient-primary text-white glow-purple py-5 px-6 text-sm">
        <Save className="mr-2 h-4 w-4" /> Commit System Changes
      </Button>
    </motion.div>
  )
}