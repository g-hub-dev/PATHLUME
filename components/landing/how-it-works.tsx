"use client"

import { motion } from "framer-motion"
import { UserPlus, ClipboardCheck, Route, Rocket } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your learning goals, current skill level, and available time commitment.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Take Assessment",
    description: "Complete our AI-powered diagnostic quiz to identify your strengths, weaknesses, and learning style.",
  },
  {
    icon: Route,
    step: "03",
    title: "Get Your Roadmap",
    description: "Receive a personalized learning path with day-by-day modules, resources, and milestones.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Start Learning",
    description: "Begin your journey with adaptive content that evolves based on your progress and performance.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
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
            <Route className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Pathlume
            </span>{" "}
            Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Get started in minutes and let our AI create the perfect learning journey for you.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Card */}
                <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-6">
                    <div className="glass-card rounded-lg px-3 py-1">
                      <span className="text-sm font-mono font-bold text-primary">{step.step}</span>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="mt-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex p-4 rounded-xl gradient-primary glow-purple"
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Connector (visible on lg+) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-primary">
                        <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Ready to start your learning journey?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gradient-primary text-white font-semibold px-8 py-3 rounded-xl glow-purple hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
