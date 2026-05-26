"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Sparkles,
  Bot,
  User,
  Lightbulb,
  Code,
  BookOpen,
  HelpCircle,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@/lib/user-context"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  { icon: Code, text: "Explain list comprehensions in Python" },
  { icon: HelpCircle, text: "What should I learn next?" },
  { icon: BookOpen, text: "Give me a practice problem" },
  { icon: Lightbulb, text: "Tips to improve my coding speed" },
]

export default function MentorPage() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with personalized greeting
  useEffect(() => {
    const greeting = `Hello${user ? `, ${user.name.split(' ')[0]}` : ""}! I'm your AI learning mentor, powered by advanced machine learning to understand your unique learning style.

I've analyzed your progress and I'm here to help you:
- Answer questions about ${user?.currentPath?.name || "your learning path"}
- Provide personalized study recommendations
- Create custom practice problems
- Explain concepts in ways that match your learning style

What would you like to explore today?`

    setMessages([{
      id: "1",
      role: "assistant",
      content: greeting,
      timestamp: new Date(),
    }])
  }, [user])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    const userName = user?.name?.split(' ')[0] || "there"
    
    if (lowerMessage.includes("list comprehension")) {
      return `Great question, ${userName}! List comprehensions are a concise way to create lists in Python. Based on your learning style, let me explain with visual examples:

**Basic Syntax:**
\`\`\`python
new_list = [expression for item in iterable if condition]
\`\`\`

**Example - Traditional vs Comprehension:**
\`\`\`python
# Traditional way (more lines)
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension (one elegant line!)
squares = [x**2 for x in range(10)]
# Result: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

**With a condition filter:**
\`\`\`python
# Only squares of even numbers
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# Result: [0, 4, 16, 36, 64]
\`\`\`

**Pro tip:** Think of it as "give me [this] for each [item] in [collection] if [condition]"

Ready to test your understanding? I can give you a practice problem! 🎯`
    }
    
    if (lowerMessage.includes("learn next") || lowerMessage.includes("what should")) {
      return `Based on your progress data, ${userName}, I have a personalized recommendation:

📊 **Your Current Stats:**
- Overall Progress: ${user?.currentPath?.progress || 68}%
- Modules Completed: ${user?.currentPath?.modulesCompleted || 17}/${user?.currentPath?.totalModules || 25}
- Current Streak: ${user?.streak || 15} days 🔥

🎯 **Recommended Focus: Dictionaries**

Here's why:
1. **Skill gap detected:** Your assessment shows dictionaries at 45% - lowest among your topics
2. **Foundation critical:** Dictionaries are essential for data manipulation and APIs
3. **Synergy:** You've mastered lists (72%), and dictionaries build on similar concepts

📋 **Your Personalized Next Steps:**
1. Complete "Working with Dictionaries" module (25 min)
2. Practice key-value pair operations (3 exercises)
3. Build mini project: Contact Book

**Time estimate:** 45 minutes - perfect for your preferred session length!

Want me to start with dictionary basics, or create a quick diagnostic quiz?`
    }
    
    if (lowerMessage.includes("practice problem") || lowerMessage.includes("exercise")) {
      return `Here's a challenge tailored to your skill level, ${userName}:

**🧩 Challenge: Word Frequency Counter**
*Difficulty: Medium | Estimated time: 10 minutes*

Write a function that takes a string and returns a dictionary counting word occurrences:

\`\`\`python
def word_frequency(text):
    # Your code here
    pass

# Test your solution:
text = "hello world hello python world world"
print(word_frequency(text))
# Expected output: {'hello': 2, 'world': 3, 'python': 1}
\`\`\`

**💡 Hints (click to reveal):**
1. Use \`.split()\` to break string into words
2. Initialize an empty dictionary
3. Loop through words and update counts
4. Consider using \`.get()\` method for cleaner code

**Bonus challenges:**
- Make it case-insensitive
- Handle punctuation
- Sort by frequency

Type "solution" when you're ready to see the answer, or share your attempt and I'll review it!`
    }
    
    if (lowerMessage.includes("tip") || lowerMessage.includes("improve") || lowerMessage.includes("speed")) {
      return `Here are personalized tips based on your learning analytics, ${userName}:

**🚀 Your Top 5 Speed-Boosting Strategies:**

**1. Master Keyboard Shortcuts** ⌨️
Your IDE time could improve 23% with better shortcuts:
- \`Ctrl+D\` - Duplicate line
- \`Ctrl+/\` - Toggle comment
- \`Alt+↑/↓\` - Move line up/down

**2. Practice Active Recall** 🧠
Your data shows 40% better retention when:
- Typing solutions instead of copy-pasting
- Attempting problems before checking notes
- Teaching concepts to your AI mentor (me!)

**3. Optimize Your Schedule** ⏰
Your analytics reveal peak performance:
- Best focus: Morning sessions (9-11 AM)
- Optimal duration: ${user?.preferences?.dailyGoal || 30} minutes
- Ideal break: 5-minute walks between modules

**4. Use the Pomodoro Technique** 🍅
- 25 min focused coding
- 5 min break
- Repeat 4x, then 15 min break

**5. Build Muscle Memory** 💪
- Daily typing practice (5 min)
- Common pattern drills
- Quick challenges on your weak areas

**📈 Expected improvement:** 35% faster problem-solving within 2 weeks

Which tip would you like me to expand on?`
    }
    
    if (lowerMessage.includes("solution")) {
      return `Here's the solution, ${userName}:

\`\`\`python
def word_frequency(text):
    words = text.lower().split()
    frequency = {}
    
    for word in words:
        frequency[word] = frequency.get(word, 0) + 1
    
    return frequency

# Alternative using Counter (more Pythonic):
from collections import Counter

def word_frequency_v2(text):
    return dict(Counter(text.lower().split()))
\`\`\`

**🔍 Code breakdown:**
1. \`.lower()\` makes it case-insensitive
2. \`.split()\` breaks string into word list
3. \`.get(word, 0)\` returns 0 if word not found
4. \`Counter\` is a built-in tool for counting!

**✅ You earned: +25 XP for completing this challenge!**

Want another problem, or shall we move to a new topic?`
    }
    
    return `That's an interesting question, ${userName}! Let me help you with that.

Based on your current progress in ${user?.currentPath?.name || "your learning path"} (${user?.currentPath?.progress || 68}% complete), here's my recommendation:

**📚 My Analysis:**
1. **Review fundamentals** - Ensure a solid foundation first
2. **Practice with examples** - Apply concepts to real code
3. **Build something** - Create a mini project to reinforce learning

**🎯 Next steps I suggest:**
- Would you like a detailed explanation of a specific concept?
- Should I create a custom practice problem?
- Want me to quiz you on recent topics?

I'm adapting my responses to your ${user?.preferences?.learningStyle || "mixed"} learning style. What would be most helpful right now?`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time with variable delay
    const delay = 1000 + Math.random() * 1000
    await new Promise((resolve) => setTimeout(resolve, delay))

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateResponse(input),
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-3rem)] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div 
            className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center relative"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(139, 92, 246, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="h-7 w-7 text-white" />
            <motion.div 
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-success border-2 border-background"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Mentor</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <motion.span 
                className="h-2 w-2 rounded-full bg-success"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>Powered by advanced AI - Always learning with you</span>
            </div>
          </div>
        </div>
        
        {/* Status badges */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
            Personalized
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30">
            Real-time
          </span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden border border-white/10">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <motion.div 
                  className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant" 
                      ? "gradient-primary glow-purple" 
                      : "bg-accent"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {message.role === "assistant" ? (
                    <Sparkles className="h-5 w-5 text-white" />
                  ) : user ? (
                    <span className="text-white text-sm font-semibold">{user.initials}</span>
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </motion.div>

                {/* Message Content */}
                <div className={`max-w-[75%] ${message.role === "user" ? "text-right" : ""}`}>
                  <motion.div 
                    className={`inline-block p-4 rounded-2xl ${
                      message.role === "assistant"
                        ? "glass text-foreground border border-white/10"
                        : "gradient-primary text-white"
                    }`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content.split("```").map((part, i) => {
                        if (i % 2 === 1) {
                          const [lang, ...code] = part.split("\n")
                          return (
                            <div key={i} className="my-3 relative group">
                              <pre className="p-4 rounded-xl bg-background/80 overflow-x-auto border border-white/5">
                                <code className="text-xs font-mono text-foreground">{code.join("\n")}</code>
                              </pre>
                              <button
                                onClick={() => copyToClipboard(code.join("\n"), `${message.id}-${i}`)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {copiedId === `${message.id}-${i}` ? (
                                  <Check className="h-3.5 w-3.5 text-success" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                              </button>
                            </div>
                          )
                        }
                        return <span key={i}>{part}</span>
                      })}
                    </div>
                  </motion.div>
                  
                  {/* Message footer */}
                  <div className={`flex items-center gap-3 mt-2 ${message.role === "user" ? "justify-end" : ""}`}>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-1">
                        <motion.button 
                          className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-success transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </motion.button>
                        <motion.button 
                          className="p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-destructive transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4"
              >
                <motion.div 
                  className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center glow-purple"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <div className="glass rounded-2xl px-5 py-3 border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">AI is thinking</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [0, -6, 0],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 0.8, 
                            repeat: Infinity, 
                            delay: i * 0.15,
                            ease: "easeInOut"
                          }}
                          className="h-2 w-2 rounded-full bg-primary"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <AnimatePresence>
          {messages.length <= 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-6 pb-4"
            >
              <div className="text-xs text-muted-foreground mb-3">Quick suggestions:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(q.text)}
                    className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-foreground hover:border-primary/30 transition-all border border-white/10"
                  >
                    <q.icon className="h-4 w-4 text-primary" />
                    {q.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="p-4 border-t border-border/50 bg-background/50">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-3"
          >
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your learning journey..."
                className="glass border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 h-12 pr-20 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <motion.button 
                  type="button" 
                  className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Paperclip className="h-4 w-4" />
                </motion.button>
                <motion.button 
                  type="button" 
                  className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mic className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="gradient-primary text-white glow-purple h-12 px-6 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <Send className="h-5 w-5" />
              </Button>
            </motion.div>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-2">
            AI Mentor adapts to your learning style and provides personalized guidance
          </p>
        </div>
      </div>
    </motion.div>
  )
}
