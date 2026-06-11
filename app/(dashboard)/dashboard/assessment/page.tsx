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
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/progress-ring"

interface QuestionOption {
  id: string;
  text: string;
}

interface DynamicQuestion {
  id: number;
  question: string;
  options: QuestionOption[];
  correct: string;
  topic: string;
}

interface SkillTopic {
  topic: string;
  score: number;
  level: string;
}

export default function AssessmentPage() {
  const [topicInput, setTopicInput] = useState("")
  const [questions, setQuestions] = useState<DynamicQuestion[]>([])
  const [skillAnalysis, setSkillAnalysis] = useState<SkillTopic[]>([])
  const [aiRecommendation, setAiRecommendation] = useState("Provide an objective field above to run diagnosis infrastructure parameters.")

  const [quizStarted, setQuizStarted] = useState(false)
  const [loadingQuiz, setLoadingQuiz] = useState(false)
  const [apiError, setApiError] = useState("")
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Fetch Questions directly from Gemini via native Web API
  const generateAIQuiz = async () => {
    if (!topicInput.trim()) {
      setApiError("System online. Ready to accept core engineering coordinates.");
      return;
    }

    setLoadingQuiz(true);
    setApiError("");
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setApiError("Configuration Error: Missing system environment key (NEXT_PUBLIC_GEMINI_API_KEY).");
      setLoadingQuiz(false);
      return;
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const promptText = `Generate a rigorous technical 5-question multiple-choice assessment for the topic "${topicInput}".
    Return ONLY a raw valid JSON object matching this schema precisely without markdown code-blocks or backticks:
    {
      "questions": [
        {
          "id": 1,
          "question": "Clear technical question here?",
          "options": [
            {"id": "a", "text": "Option A text"},
            {"id": "b", "text": "Option B text"},
            {"id": "c", "text": "Option C text"},
            {"id": "d", "text": "Option D text"}
          ],
          "correct": "a",
          "topic": "Subtopic Title"
        }
      ]
    }`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text.trim();
      const cleanJson = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      if (parsed.questions && parsed.questions.length > 0) {
        setQuestions(parsed.questions);
        setQuizStarted(true);
      } else {
        throw new Error("Invalid structure returned");
      }
    } catch (err) {
      console.error(err);
      setApiError("Failed to fetch node vectors. Verify internet connection or API keys.");
    } finally {
      setLoadingQuiz(false);
    }
  };

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
      processFinalMetrics({ ...answers, [currentQuestion]: selectedAnswer });
    }
  };

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

  // Processes dynamic metrics at runtime when quiz finishes
  const processFinalMetrics = (finalAnswers: { [key: number]: string }) => {
    const topicMap: { [key: string]: { correct: number; total: number } } = {};
    
    questions.forEach((q, idx) => {
      if (!topicMap[q.topic]) {
        topicMap[q.topic] = { correct: 0, total: 0 };
      }
      topicMap[q.topic].total += 1;
      if (finalAnswers[idx] === q.correct) {
        topicMap[q.topic].correct += 1;
      }
    });

    const analysis: SkillTopic[] = Object.entries(topicMap).map(([topicName, stats]) => {
      const pct = Math.round((stats.correct / stats.total) * 100);
      let lvl = "Needs Work";
      if (pct >= 80) lvl = "Strong";
      else if (pct >= 60) lvl = "Good";
      else if (pct >= 40) lvl = "Moderate";

      return { topic: topicName, score: pct || 20, level: lvl };
    });

    const weakTopics = analysis.filter(t => t.score < 70).map(t => t.topic);
    
    setSkillAnalysis(analysis);
    if (weakTopics.length > 0) {
      setAiRecommendation(`Our telemetry detects developmental focus vectors required within: ${weakTopics.join(", ")}. Optimization pipelines have adjusted your tracking modules.`);
    } else {
      setAiRecommendation("Exceptional execution across all monitored data layers. Foundation parameters are solid.");
    }
    setQuizCompleted(true);
  };

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Adaptive Skill Assessment</h1>
          <p className="text-muted-foreground mt-1">
            Generate customized telemetry evaluations using instant AI deployment models.
          </p>
        </div>

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
              Initialize Target Matrix
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter any technical discipline, computer engineering field, or language framework below. 
              The engine will compile an optimized verification matrix.
            </p>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g., Python Lists, Network Routing, Java Threading..."
                className="w-full bg-slate-900/60 border border-border/60 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary text-sm transition-colors"
              />
              {apiError && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl">
                  ⚠️ {apiError}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Adaptive Velocity</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>5 Custom Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>+100 XP Engine Payload</span>
              </div>
            </div>

            <Button
              onClick={generateAIQuiz}
              disabled={loadingQuiz}
              className="gradient-primary text-white glow-purple text-lg px-8 py-6 disabled:opacity-50"
            >
              {loadingQuiz ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Compiling Nodes...
                </>
              ) : (
                <>
                  Launch Assessment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Diagnostics Display Dashboard Area */}
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
            
            {skillAnalysis.length === 0 ? (
              <div className="h-48 border border-dashed border-border/40 rounded-xl flex items-center justify-center text-sm text-muted-foreground">
                No active records logged. Initialize a diagnostic framework to begin.
              </div>
            ) : (
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
                          skill.score >= 80 ? "bg-success" : skill.score >= 60 ? "bg-accent" : skill.score >= 40 ? "bg-warning" : "bg-destructive"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 p-4 glass rounded-xl">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">AI Recommendation</div>
                  <div className="text-xs text-muted-foreground">{aiRecommendation}</div>
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
            className="mb-6 flex justify-center"
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
            Telemetry extraction complete. Your localized metadata metrics have indexed perfectly.
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
            <Button className="gradient-primary text-white glow-purple" onClick={() => window.location.reload()}>
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

      {/* Question Card Display Area */}
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

          {/* Instant Validation Telemetry Feedback */}
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
                  {isCorrect ? "Response Confirmed!" : "Deviation Logged"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isCorrect
                  ? "Execution path valid. Conceptual sync matches reference architecture metrics."
                  : `Target answer matched structural node: ${currentQ.correct.toUpperCase()}. This node is queued into your optimization lists.`}
              </p>
            </motion.div>
          )}

          {/* Action Blocks */}
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