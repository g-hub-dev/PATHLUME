"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  level: number
  xp: number
  totalXp: number
  streak: number
  bestStreak: number
  joinedAt: Date
  currentPath: {
    name: string
    progress: number
    modulesCompleted: number
    totalModules: number
  }
  stats: {
    hoursLearned: number
    coursesCompleted: number
    badgesEarned: number
    quizzesPassed: number
  }
  preferences: {
    dailyGoal: number // minutes
    preferredTime: string
    learningStyle: "visual" | "reading" | "hands-on" | "mixed"
  }
}

interface UserContextType {
  user: UserData | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<UserData>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Simulated user data - in production this would come from your auth provider/database
const createDefaultUser = (name: string, email: string): UserData => {
  const nameParts = name.split(" ")
  const initials = nameParts.length > 1 
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : name.substring(0, 2).toUpperCase()
  
  return {
    id: crypto.randomUUID(),
    name,
    email,
    initials,
    level: 12,
    xp: 2450,
    totalXp: 3000,
    streak: 15,
    bestStreak: 23,
    joinedAt: new Date(),
    currentPath: {
      name: "Data Science Fundamentals",
      progress: 68,
      modulesCompleted: 17,
      totalModules: 25,
    },
    stats: {
      hoursLearned: 47.5,
      coursesCompleted: 8,
      badgesEarned: 24,
      quizzesPassed: 32,
    },
    preferences: {
      dailyGoal: 30,
      preferredTime: "evening",
      learningStyle: "mixed",
    },
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("pathlume_user")
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        parsed.joinedAt = new Date(parsed.joinedAt)
        setUser(parsed)
      } catch {
        localStorage.removeItem("pathlume_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo, extract name from email or use a default
    const nameFromEmail = email.split("@")[0].replace(/[._]/g, " ")
    const formattedName = nameFromEmail
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    
    const userData = createDefaultUser(formattedName || "User", email)
    setUser(userData)
    localStorage.setItem("pathlume_user", JSON.stringify(userData))
    setIsLoading(false)
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData = createDefaultUser(name, email)
    // New users start fresh
    userData.level = 1
    userData.xp = 0
    userData.streak = 0
    userData.currentPath.progress = 0
    userData.currentPath.modulesCompleted = 0
    userData.stats = {
      hoursLearned: 0,
      coursesCompleted: 0,
      badgesEarned: 0,
      quizzesPassed: 0,
    }
    
    setUser(userData)
    localStorage.setItem("pathlume_user", JSON.stringify(userData))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pathlume_user")
  }

  const updateUser = (data: Partial<UserData>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      localStorage.setItem("pathlume_user", JSON.stringify(updated))
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
