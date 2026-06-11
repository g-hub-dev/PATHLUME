"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  ChevronRight,
  Sparkles,
  Target,
  Lightbulb,
  Loader2,
  BookOpen,
  Compass,
  Layers,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface RoadmapNode {
  id: number;
  title: string;
  desc: string;
  focusArea: string;
  estimatedTime: string;
}

export default function LearningPathPage() {
  const [topicInput, setTopicInput] = useState("")
  const [nodes, setNodes] = useState<RoadmapNode[]>([])
  const [loadingPath, setLoadingPath] = useState(false)
  const [apiError, setApiError] = useState("")
  const [activeNode, setActiveNode] = useState<number | null>(null)

  // Fetch Live Structured Roadmap from Gemini via native Web API
  const generateAIRoadmap = async () => {
    if (!topicInput.trim()) {
      setApiError("System online. Ready to accept core engineering coordinates.")
      return
    }

    setLoadingPath(true)
    setApiError("")
    setNodes([])
    setActiveNode(null)
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey) {
      setApiError("Configuration Error: Missing system environment key (NEXT_PUBLIC_GEMINI_API_KEY).")
      setLoadingPath(false)
      return
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    
    const promptText = `Generate a rigorous engineering 4-step progressive learning roadmap to master the topic "${topicInput}".
    Return ONLY a raw valid JSON object matching this schema precisely without markdown code-blocks, backticks, or prose:
    {
      "nodes": [
        {
          "id": 1,
          "title": "Phase Phase Name",
          "desc": "Deep explanation of technical architectures and topics to analyze.",
          "focusArea": "Core Tool, Language, or Framework to look into",
          "estimatedTime": "e.g., 2-3 Weeks"
        }
      ]
    }`

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      })

      const data = await response.json()
      const rawText = data.candidates[0].content.parts[0].text.trim()
      const cleanJson = rawText.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(cleanJson)

      if (parsed.nodes && parsed.nodes.length > 0) {
        setNodes(parsed.nodes)
      } else {
        throw new Error("Invalid telemetry matrix schema structure data")
      }
    } catch (err) {
      console.error(err)
      setApiError("Failed to fetch node vectors. Verify internet configuration parameters.")
    } finally {
      setLoadingPath(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header Layout Layer */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI GPS Routing Engine</h1>
        <p className="text-muted-foreground mt-1">
          Compute custom dynamic learning branches with live technical vector nodes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Input System Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="h-12 w-12 rounded-xl gradient-primary glow-purple flex items-center justify-center mb-4">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Initialize Coordinates</h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Define your specialization target. The platform will interface with global AI layers to assemble optimized learning milestones.
            </p>

            <div className="space-y-4 mb-4">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g., Java Threading, Deep Learning Models, Microprocessors..."
                className="w-full bg-slate-900/60 border border-border/60 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary text-sm transition-colors"
              />
              {apiError && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl">
                  ⚠️ {apiError}
                </div>
              )}
            </div>

            <Button
              onClick={generateAIRoadmap}
              disabled={loadingPath}
              className="w-full gradient-primary text-white glow-purple py-5 disabled:opacity-50 text-sm"
            >
              {loadingPath ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mapping Telemetry...
                </>
              ) : (
                <>
                  Generate Vector Path
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Metric Overview Telemetry Tracker */}
          {nodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-5 space-y-4 text-xs"
            >
              <div className="flex items-center gap-2 text-foreground font-semibold border-b border-border/40 pb-2 text-sm">
                <Layers className="h-4 w-4 text-primary" />
                <span>Path Matrix Index</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total Milestones:</span>
                <span className="text-foreground font-medium">{nodes.length} Blocks</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Target:</span>
                <span className="text-foreground font-medium">Adaptive Velocity</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Completion Payloads:</span>
                <span className="text-primary font-medium flex items-center gap-1">
                  <Award className="h-3 w-3" /> +250 XP / Milestone
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Dynamic Nodes Tracking Map Render Zone */}
        <div className="lg:col-span-2">
          {loadingPath && (
            <div className="h-64 border border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground bg-slate-900/10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span>Constructing customized pipeline layers... Please hold connection.</span>
            </div>
          )}

          {!loadingPath && nodes.length === 0 && (
            <div className="h-64 border border-dashed border-border/40 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-sm text-muted-foreground">
              <Target className="h-8 w-8 text-muted-foreground/40 mb-3" />
              <span>System Idle. Provide target initialization mapping criteria to plot visual track vectors.</span>
            </div>
          )}

          {!loadingPath && nodes.length > 0 && (
            <div className="relative border-l border-border/80 ml-4 pl-6 space-y-6">
              <AnimatePresence>
                {nodes.map((node, index) => {
                  const isExpanded = activeNode === node.id
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="relative"
                    >
                      {/* Interactive Visual Node Point Pin */}
                      <span className="absolute -left-[31px] top-2 h-4 w-4 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      </span>

                      {/* Glassmorphic Node Body Panel Container */}
                      <div
                        onClick={() => setActiveNode(isExpanded ? null : node.id)}
                        className={`glass-card rounded-xl p-5 cursor-pointer border transition-all hover:border-primary/40 ${
                          isExpanded ? "border-primary/50 shadow-[0_0_20px_rgba(147,51,234,0.15)] bg-slate-900/40" : "border-border/40"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">
                              Node 0{node.id}
                            </span>
                            <h3 className="text-base font-bold text-foreground tracking-wide">
                              {node.title}
                            </h3>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 bg-muted/40 px-2.5 py-1 rounded-lg border border-border/20 self-start sm:self-auto">
                            <Clock className="h-3 w-3 text-primary" />
                            {node.estimatedTime}
                          </span>
                        </div>

                        {/* Collapsible Meta Data Layer */}
                        <motion.div
                          initial={false}
                          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                          className="overflow-hidden text-sm text-muted-foreground"
                          transition={{ duration: 0.2 }}
                        >
                          <p className="mt-4 leading-relaxed text-foreground/80 border-t border-border/40 pt-3">
                            {node.desc}
                          </p>
                          <div className="mt-4 p-3 bg-muted/30 border border-border/40 rounded-xl flex items-center gap-2.5 text-xs">
                            <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                            <div>
                              <span className="font-bold text-foreground block mb-0.5 uppercase tracking-wider">Focus Vector Target</span>
                              <span>{node.focusArea}</span>
                            </div>
                          </div>
                        </motion.div>

                        {!isExpanded && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                            {node.desc}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}