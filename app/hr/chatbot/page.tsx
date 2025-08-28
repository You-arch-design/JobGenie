"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Send, Bot, User, ArrowLeft, Briefcase, Sparkles, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  data?: any
}

interface CandidateResult {
  id: number
  name: string
  email: string
  position: string
  score: number
  skills: string[]
  experience: string
  location: string
}

const mockCandidateData: CandidateResult[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    position: "Senior Frontend Developer",
    score: 92,
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    experience: "6 years",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    position: "Senior Frontend Developer",
    score: 87,
    skills: ["React", "Vue.js", "JavaScript", "CSS"],
    experience: "8 years",
    location: "Remote",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    position: "Java Developer",
    score: 85,
    skills: ["Java", "Spring", "MySQL", "AWS"],
    experience: "5 years",
    location: "New York, NY",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    position: "Java Developer",
    score: 88,
    skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    experience: "7 years",
    location: "Austin, TX",
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex.chen@email.com",
    position: "Python Developer",
    score: 90,
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    experience: "4 years",
    location: "Seattle, WA",
  },
]

const suggestedQueries = [
  "Show me top 5 Java developers",
  "Find React developers with 5+ years experience",
  "Who are the highest scoring candidates?",
  "Show Python developers in Seattle",
  "Find candidates with AWS experience",
  "Show me recent applications",
]

export default function HRChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI hiring assistant. I can help you find candidates, analyze resumes, and answer questions about your talent pipeline. Try asking me something like 'Show me top 5 Java developers' or 'Find React developers with 5+ years experience'.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const processQuery = async (query: string): Promise<{ content: string; data?: any }> => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const queryLower = query.toLowerCase()

    // Pattern matching for different types of queries
    if (queryLower.includes("top") && queryLower.includes("java")) {
      const javaDevs = mockCandidateData
        .filter((candidate) => candidate.skills.some((skill) => skill.toLowerCase().includes("java")))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)

      return {
        content: `Here are the top ${javaDevs.length} Java developers based on AI matching scores:`,
        data: { type: "candidates", candidates: javaDevs },
      }
    }

    if (queryLower.includes("react") && queryLower.includes("experience")) {
      const reactDevs = mockCandidateData
        .filter((candidate) => {
          const hasReact = candidate.skills.some((skill) => skill.toLowerCase().includes("react"))
          const experienceYears = Number.parseInt(candidate.experience)
          return hasReact && experienceYears >= 5
        })
        .sort((a, b) => b.score - a.score)

      return {
        content: `Found ${reactDevs.length} React developers with 5+ years of experience:`,
        data: { type: "candidates", candidates: reactDevs },
      }
    }

    if (queryLower.includes("highest scoring") || queryLower.includes("best candidates")) {
      const topCandidates = mockCandidateData.sort((a, b) => b.score - a.score).slice(0, 5)

      return {
        content: "Here are the highest scoring candidates across all positions:",
        data: { type: "candidates", candidates: topCandidates },
      }
    }

    if (queryLower.includes("python") && queryLower.includes("seattle")) {
      const pythonSeattle = mockCandidateData.filter(
        (candidate) =>
          candidate.skills.some((skill) => skill.toLowerCase().includes("python")) &&
          candidate.location.toLowerCase().includes("seattle"),
      )

      return {
        content: `Found ${pythonSeattle.length} Python developers in Seattle:`,
        data: { type: "candidates", candidates: pythonSeattle },
      }
    }

    if (queryLower.includes("aws")) {
      const awsCandidates = mockCandidateData.filter((candidate) =>
        candidate.skills.some((skill) => skill.toLowerCase().includes("aws")),
      )

      return {
        content: `Found ${awsCandidates.length} candidates with AWS experience:`,
        data: { type: "candidates", candidates: awsCandidates },
      }
    }

    if (queryLower.includes("recent applications")) {
      return {
        content: "Here's a summary of recent applications:",
        data: {
          type: "stats",
          stats: {
            totalApplications: 47,
            thisWeek: 12,
            topSkills: ["JavaScript", "React", "Python", "Java"],
            averageScore: 78,
          },
        },
      }
    }

    // Default response for unrecognized queries
    return {
      content:
        "I'm not sure how to help with that specific query. Try asking me about finding candidates by skills, experience, location, or scores. For example: 'Show me React developers' or 'Find candidates with 5+ years experience'.",
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await processQuery(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content,
        timestamp: new Date(),
        data: response.data,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query)
    inputRef.current?.focus()
  }

  const renderCandidateResults = (candidates: CandidateResult[]) => (
    <div className="space-y-3 mt-3">
      {candidates.map((candidate) => (
        <Card key={candidate.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{candidate.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  {candidate.score}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{candidate.email}</p>
              <p className="text-sm font-medium mb-2">{candidate.position}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span>{candidate.experience} experience</span>
                <span>{candidate.location}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {candidate.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{candidate.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )

  const renderStats = (stats: any) => (
    <div className="grid grid-cols-2 gap-4 mt-3">
      <Card className="p-4">
        <div className="text-2xl font-bold text-primary">{stats.totalApplications}</div>
        <p className="text-sm text-muted-foreground">Total Applications</p>
      </Card>
      <Card className="p-4">
        <div className="text-2xl font-bold text-primary">{stats.thisWeek}</div>
        <p className="text-sm text-muted-foreground">This Week</p>
      </Card>
      <Card className="p-4">
        <div className="text-2xl font-bold text-primary">{stats.averageScore}%</div>
        <p className="text-sm text-muted-foreground">Average Score</p>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium mb-2">Top Skills</div>
        <div className="flex flex-wrap gap-1">
          {stats.topSkills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/hr/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">AI Hiring Assistant</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">JobGenie HR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with suggestions */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Quick Queries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2 text-xs"
                    onClick={() => handleSuggestedQuery(query)}
                  >
                    {query}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Active Candidates</span>
                  <span className="text-sm font-medium">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Avg. Match Score</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">This Week</span>
                  <span className="text-sm font-medium">12 new</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Hiring Assistant
                </CardTitle>
                <CardDescription>Ask me anything about your candidates, skills, or hiring pipeline</CardDescription>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                        {message.type === "bot" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10">
                              <Bot className="h-4 w-4 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>

                          {/* Render special data */}
                          {message.data?.type === "candidates" && renderCandidateResults(message.data.candidates)}
                          {message.data?.type === "stats" && renderStats(message.data.stats)}

                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>

                        {message.type === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-secondary">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10">
                            <Bot className="h-4 w-4 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about candidates, skills, or hiring insights..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: "Show me top Java developers" or "Find React candidates with 5+ years experience"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
