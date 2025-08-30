"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Send, 
  Bot, 
  User, 
  FileText, 
  Upload, 
  Sparkles, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Target,
  Zap
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  data?: any
}

interface ResumeAnalysis {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  skills: string[]
  experience: string
  education: string
  keywords: string[]
  industryMatch: string
  improvementAreas: string[]
}

const mockResumeAnalysis: ResumeAnalysis = {
  overallScore: 85,
  strengths: [
    "Strong technical skills in React and TypeScript",
    "Clear project descriptions with measurable outcomes",
    "Good use of action verbs and quantifiable results",
    "Professional formatting and structure"
  ],
  weaknesses: [
    "Could benefit from more industry-specific keywords",
    "Some experience descriptions are too brief",
    "Skills section could be better organized by category"
  ],
  suggestions: [
    "Add more industry-specific keywords for ATS optimization",
    "Expand on key project achievements with metrics",
    "Group skills by category (Frontend, Backend, Tools)",
    "Include a professional summary at the top",
    "Add certifications if available"
  ],
  skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Docker", "Git", "Agile"],
  experience: "5 years",
  education: "Bachelor's in Computer Science",
  keywords: ["frontend development", "react", "typescript", "web applications", "user experience"],
  industryMatch: "Technology/Software Development",
  improvementAreas: ["ATS Optimization", "Keyword Density", "Achievement Quantification"]
}

const suggestedQueries = [
  "Analyze my resume for ATS optimization",
  "What skills should I highlight?",
  "How can I improve my resume?",
  "Check for missing keywords",
  "Rate my resume strength",
  "Suggest improvements"
]

export default function ResumeAnalyzerChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI Resume Analyzer. I can help you analyze your resume, provide feedback, and suggest improvements to make it ATS-friendly and compelling to employers. Try asking me something like 'Analyze my resume for ATS optimization' or 'What skills should I highlight?'",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [resumeText, setResumeText] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const processQuery = async (query: string): Promise<{ content: string; data?: any }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const queryLower = query.toLowerCase()

    if (queryLower.includes("analyze") || queryLower.includes("ats") || queryLower.includes("optimization")) {
      return {
        content: "Here's a comprehensive analysis of your resume for ATS optimization:",
        data: { type: "resume_analysis", analysis: mockResumeAnalysis },
      }
    }

    if (queryLower.includes("skills") && queryLower.includes("highlight")) {
      return {
        content: "Based on your resume, here are the key skills you should emphasize:",
        data: { 
          type: "skills_highlight", 
          skills: mockResumeAnalysis.skills,
          suggestions: [
            "Frontend: React, TypeScript, HTML/CSS",
            "Backend: Node.js, MongoDB, APIs",
            "DevOps: AWS, Docker, Git",
            "Soft Skills: Agile, Team Collaboration"
          ]
        },
      }
    }

    if (queryLower.includes("improve") || queryLower.includes("suggestions")) {
      return {
        content: "Here are specific suggestions to improve your resume:",
        data: { 
          type: "improvements", 
          suggestions: mockResumeAnalysis.suggestions,
          areas: mockResumeAnalysis.improvementAreas
        },
      }
    }

    if (queryLower.includes("keywords") || queryLower.includes("missing")) {
      return {
        content: "Here's an analysis of your resume keywords and suggestions:",
        data: { 
          type: "keywords", 
          current: mockResumeAnalysis.keywords,
          suggested: [
            "machine learning", "data analysis", "cloud computing",
            "microservices", "CI/CD", "testing", "performance optimization"
          ]
        },
      }
    }

    if (queryLower.includes("rate") || queryLower.includes("strength")) {
      return {
        content: `Your resume currently scores ${mockResumeAnalysis.overallScore}/100. Here's the breakdown:`,
        data: { 
          type: "rating", 
          score: mockResumeAnalysis.overallScore,
          strengths: mockResumeAnalysis.strengths,
          weaknesses: mockResumeAnalysis.weaknesses
        },
      }
    }

    return {
      content:
        "I can help you analyze your resume for ATS optimization, suggest improvements, highlight skills, and more. Try asking me about analyzing your resume, checking keywords, or getting improvement suggestions.",
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

  const renderResumeAnalysis = (analysis: ResumeAnalysis) => (
    <div className="space-y-4 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-primary mb-2">{analysis.overallScore}/100</div>
          <p className="text-sm text-muted-foreground">Overall Score</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{analysis.experience}</div>
          <p className="text-sm text-muted-foreground">Experience</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{analysis.skills.length}</div>
          <p className="text-sm text-muted-foreground">Skills</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardTitle className="text-lg mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Strengths
          </CardTitle>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <CardTitle className="text-lg mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Areas for Improvement
          </CardTitle>
          <ul className="space-y-2">
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                {weakness}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-4">
        <CardTitle className="text-lg mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          Key Suggestions
        </CardTitle>
        <div className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{suggestion}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderSkillsHighlight = (data: any) => (
    <div className="space-y-4 mt-3">
      <Card className="p-4">
        <CardTitle className="text-lg mb-3">Current Skills</CardTitle>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <CardTitle className="text-lg mb-3">Recommended Skill Organization</CardTitle>
        <div className="space-y-3">
          {data.suggestions.map((category: string, index: number) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">{category}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderImprovements = (data: any) => (
    <div className="space-y-4 mt-3">
      <Card className="p-4">
        <CardTitle className="text-lg mb-3">Priority Improvements</CardTitle>
        <div className="space-y-3">
          {data.suggestions.map((suggestion: string, index: number) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{suggestion}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <CardTitle className="text-lg mb-3">Focus Areas</CardTitle>
        <div className="flex flex-wrap gap-2">
          {data.areas.map((area: string) => (
            <Badge key={area} variant="outline" className="text-orange-600 border-orange-200">
              {area}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderKeywords = (data: any) => (
    <div className="space-y-4 mt-3">
      <Card className="p-4">
        <CardTitle className="text-lg mb-3">Current Keywords</CardTitle>
        <div className="flex flex-wrap gap-2">
          {data.current.map((keyword: string) => (
            <Badge key={keyword} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <CardTitle className="text-lg mb-3">Suggested Keywords to Add</CardTitle>
        <div className="flex flex-wrap gap-2">
          {data.suggested.map((keyword: string) => (
            <Badge key={keyword} variant="outline" className="text-blue-600 border-blue-200">
              + {keyword}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderRating = (data: any) => (
    <div className="space-y-4 mt-3">
      <Card className="p-4 text-center">
        <div className="text-4xl font-bold text-primary mb-2">{data.score}/100</div>
        <p className="text-lg text-muted-foreground mb-4">Resume Score</p>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${data.score}%` }}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <CardTitle className="text-lg mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            What's Working
          </CardTitle>
          <ul className="space-y-2">
            {data.strengths.map((strength: string, index: number) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <CardTitle className="text-lg mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            What to Improve
          </CardTitle>
          <ul className="space-y-2">
            {data.weaknesses.map((weakness: string, index: number) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                {weakness}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <FileText className="h-10 w-10 text-primary" />
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant feedback on your resume with AI-powered analysis. Optimize for ATS systems and stand out to employers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resume Input Section */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Resume Input
                </CardTitle>
                <CardDescription>Paste your resume text for analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
                <Button 
                  className="w-full" 
                  disabled={!resumeText.trim()}
                  onClick={() => {
                    if (resumeText.trim()) {
                      setInputValue("Analyze my resume for ATS optimization")
                      handleSendMessage()
                    }
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Resume
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Quick Analysis
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
                  Analysis Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Resumes Analyzed</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Avg. Score</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Success Rate</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Resume Analyzer
                </CardTitle>
                <CardDescription>Ask me to analyze your resume, provide feedback, or suggest improvements</CardDescription>
              </CardHeader>

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
                          className={`max-w-[85%] rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>

                          {/* Render special data */}
                          {message.data?.type === "resume_analysis" && renderResumeAnalysis(message.data.analysis)}
                          {message.data?.type === "skills_highlight" && renderSkillsHighlight(message.data)}
                          {message.data?.type === "improvements" && renderImprovements(message.data)}
                          {message.data?.type === "keywords" && renderKeywords(message.data)}
                          {message.data?.type === "rating" && renderRating(message.data)}

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
                      placeholder="Ask me to analyze your resume, check keywords, or suggest improvements..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: "Analyze my resume for ATS optimization" or "What skills should I highlight?"
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


