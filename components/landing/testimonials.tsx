"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Developer",
    avatar: "SC",
    content: "Pathlume completely transformed how I learn. The AI-generated roadmap helped me go from Python basics to building ML models in just 3 months. The adaptive system knew exactly what I needed next.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Data Scientist",
    avatar: "MR",
    content: "The diagnostic assessment was eye-opening. It identified gaps in my knowledge I did not even know existed. The personalized path filled those gaps efficiently without wasting time on things I already knew.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "UX Designer",
    avatar: "EW",
    content: "I love the gamification system! The XP points and streaks keep me motivated to learn every day. I have maintained a 90-day streak and learned more than I did in a year of self-study.",
    rating: 5,
  },
  {
    name: "James Park",
    role: "Product Manager",
    avatar: "JP",
    content: "The AI mentor chatbot is incredible. It is like having a personal tutor available 24/7. Whenever I get stuck, I get instant, helpful explanations tailored to my level.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director",
    avatar: "LT",
    content: "The time compression feature is a game-changer for busy professionals. I told it I only had 30 minutes a day, and it optimized my entire learning path accordingly. So efficient!",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    avatar: "DK",
    content: "The weakness heatmap visualization helped me see exactly where I needed to focus. Instead of randomly studying, I now have a clear picture of my progress and areas to improve.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
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
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm text-muted-foreground">Loved by Learners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Community
            </span>{" "}
            Says
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Join thousands of learners who have transformed their skills with Pathlume.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12 text-primary" />
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-foreground/90 mb-6 leading-relaxed text-sm">
                  {`"${testimonial.content}"`}
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
