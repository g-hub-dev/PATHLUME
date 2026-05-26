"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BarChart3,
  Target,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/progress-ring"

const questions = [
  {
    id: 1,
    question: "What is the output of print(type([1, 2, 3]))?",
    options: [
      { id: "a", text: "<class 'tuple'>" },
      { id: "b", text: "<class 'list'>" },
      { id: "c", text: "<class 'array'>" },
      { id: "d", text: "<class 'set'>" },
    ],
    correct: "b",
    topic: "Data Types",
  },
  {
    id: 2,
    question: "Which method is used to add an element to the end of a list?",
    options: [
      { id: "a", text: "add()" },
      { id: "b", text: "insert()" },
      { id: "c", text: "append()" },
      { id: "d", text: "push()" },
    ],
    correct: "c",
    topic: "Lists",
  },
  {
    id: 3,
    question: "What does the 'len()' function return for a dictionary?",
    options: [
      { id: "a", text: "Number of values" },
      { id: "b", text: "Number of key-value pairs" },
      { id: "c", text: "Number of keys" },
      { id: "d", text: "Size in bytes" },
    ],
    correct: "b",
    topic: "Dictionaries",
  },
  {
    id: 4,
    question: "Which keyword is used to define a function in Python?",
    options: [
      { id: "a", text: "function" },
      { id: "b", text: "func" },
      { id: "c", text: "define" },
      { id: "d", text: "def" },
    ],
    correct: "d",
    topic: "Functions",
  },
  {
    id: 5,
    question: "What is the correct way to create a set in Python?",
    options: [
      { id: "a", text: "set = [1, 2, 3]" },
      { id: "b", text: "set = {1, 2, 3}" },
      { id: "c", text: "set = (1, 2, 3)" },
      { id: "d", text: 'set = "1, 2, 3"' },
    ],
    correct: "b",
    topic: "Sets",
  },
]

const skillAnalysis = [
  { topic: "Data Types", score: 85, level: "Strong" },
  { topic: "Lists", score: 72, level: "Good" },
  { topic: "Dictionaries", score: 45, level: "Needs Work" },
  { topic: "Functions", score: 90, level: "Strong" },
  { topic: "Sets", score: 60, level: "Moderate" },
]

export default function AssessmentPage() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleSelectAnswer = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer })
    }
    setShowResult(false)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleCheckAnswer = () => {
    setShowResult(true)
  }

  const calculateScore = () => {
    let correct = 0
    Object.entries(answers).forEach(([index, answer]) => {
      if (questions[parseInt(index)].correct === answer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Skill Assessment</h1>
          <p className="text-muted-foreground mt-1">
            Discover your strengths and areas for improvement
          </p>
        </div>

        {/* Assessment Card */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="h-16 w-16 rounded-2xl gradient-primary glow-purple flex items-center justify-center mb-6">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Python Fundamentals Assessment
            </h2>
            <p className="text-muted-foreground mb-6">
              Take this diagnostic quiz to help our AI understand your current skill level 
              and create a personalized learning path tailored to your needs.
            </p>
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>10-15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>{questions.length} questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>+100 XP on completion</span>
              </div>
            </div>
            <Button
              onClick={() => setQuizStarted(true)}
              className="gradient-primary text-white glow-purple text-lg px-8 py-6"
            >
              Start Assessment
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Previous Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Your Skill Analysis</h3>
            </div>
            <div className="space-y-4">
              {skillAnalysis.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{skill.topic}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      skill.level === "Strong"
                        ? "bg-success/20 text-success"
                        : skill.level === "Good"
                        ? "bg-accent/20 text-accent"
                        : skill.level === "Moderate"
                        ? "bg-warning/20 text-warning"
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        skill.score >= 80
                          ? "bg-success"
                          : skill.score >= 60
                          ? "bg-accent"
                          : skill.score >= 40
                          ? "bg-warning"
                          : "bg-destructive"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 glass rounded-xl">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">AI Recommendation</div>
                  <div className="text-xs text-muted-foreground">
                    Focus on Dictionaries and Sets to strengthen your Python foundations. 
                    Your learning path has been optimized accordingly.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (quizCompleted) {
    const score = calculateScore()
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass-card rounded-2xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6"
          >
            <ProgressRing progress={score} size={160} strokeWidth={12}>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">{score}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </ProgressRing>
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h2>
          <p className="text-muted-foreground mb-6">
            Great job! Your results have been analyzed and your learning path has been updated.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary mb-8">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">+100 XP Earned</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                setQuizStarted(false)
                setQuizCompleted(false)
                setCurrentQuestion(0)
                setAnswers({})
              }}
              variant="outline"
              className="glass border-border/50"
            >
              Retake Assessment
            </Button>
            <Button className="gradient-primary text-white glow-purple">
              View Updated Path
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correct

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Progress Header */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-muted-foreground">{currentQ.topic}</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full gradient-primary rounded-full"
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {currentQ.question}
          </h2>
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option.id
              const showCorrect = showResult && option.id === currentQ.correct
              const showIncorrect = showResult && isSelected && !isCorrect

              return (
                <motion.button
                  key={option.id}
                  whileHover={!showResult ? { scale: 1.01 } : {}}
                  whileTap={!showResult ? { scale: 0.99 } : {}}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={showResult}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    showCorrect
                      ? "bg-success/20 border-2 border-success"
                      : showIncorrect
                      ? "bg-destructive/20 border-2 border-destructive"
                      : isSelected
                      ? "bg-primary/20 border-2 border-primary"
                      : "glass hover:border-primary/30 border-2 border-transparent"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                    showCorrect
                      ? "bg-success text-white"
                      : showIncorrect
                      ? "bg-destructive text-white"
                      : isSelected
                      ? "gradient-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {option.id.toUpperCase()}
                  </div>
                  <span className="flex-1 text-foreground">{option.text}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                  {showIncorrect && <XCircle className="h-5 w-5 text-destructive" />}
                </motion.button>
              )
            })}
          </div>

          {/* Feedback */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl ${
                isCorrect ? "bg-success/20" : "bg-destructive/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
                <span className={`font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isCorrect
                  ? "Great job! You've demonstrated understanding of this concept."
                  : `The correct answer is ${currentQ.correct.toUpperCase()}. This topic will be added to your review list.`}
              </p>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            {!showResult ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className="gradient-primary text-white glow-purple"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="gradient-primary text-white glow-purple"
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
