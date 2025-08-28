"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Brain, Filter, Download, Eye, Star, ArrowLeft, Briefcase, Zap, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

// Mock data for AI matching results
const mockMatchingResults = [
  {
    id: 1,
    candidateName: "John Doe",
    email: "john.doe@email.com",
    jobTitle: "Senior Frontend Developer",
    overallScore: 92,
    skillsMatch: 88,
    experienceMatch: 95,
    educationMatch: 90,
    location: "San Francisco, CA",
    experience: "6 years",
    topSkills: ["React", "TypeScript", "Next.js", "Node.js"],
    matchedSkills: ["React", "TypeScript", "Next.js"],
    missingSkills: ["GraphQL"],
    summary:
      "Highly experienced frontend developer with strong React and TypeScript skills. Perfect match for senior role.",
    appliedDate: "2024-01-16",
  },
  {
    id: 2,
    candidateName: "Jane Smith",
    email: "jane.smith@email.com",
    jobTitle: "Senior Frontend Developer",
    overallScore: 87,
    skillsMatch: 85,
    experienceMatch: 90,
    educationMatch: 85,
    location: "Remote",
    experience: "8 years",
    topSkills: ["React", "Vue.js", "JavaScript", "CSS"],
    matchedSkills: ["React", "JavaScript"],
    missingSkills: ["TypeScript", "Next.js"],
    summary: "Experienced developer with strong React background. Would benefit from TypeScript training.",
    appliedDate: "2024-01-17",
  },
  {
    id: 3,
    candidateName: "Mike Johnson",
    email: "mike.johnson@email.com",
    jobTitle: "Senior Frontend Developer",
    overallScore: 78,
    skillsMatch: 75,
    experienceMatch: 80,
    educationMatch: 80,
    location: "New York, NY",
    experience: "4 years",
    topSkills: ["Angular", "JavaScript", "HTML", "CSS"],
    matchedSkills: ["JavaScript"],
    missingSkills: ["React", "TypeScript", "Next.js"],
    summary: "Solid developer with Angular background. Would need significant training for React-based role.",
    appliedDate: "2024-01-15",
  },
]

const mockJobRequirements = {
  title: "Senior Frontend Developer",
  requiredSkills: ["React", "TypeScript", "Next.js", "GraphQL", "Jest"],
  preferredSkills: ["Node.js", "AWS", "Docker"],
  minExperience: 5,
  education: "Bachelor's degree in Computer Science or related field",
  location: "San Francisco, CA (Remote OK)",
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600 bg-green-50 border-green-200"
  if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200"
  return "text-red-600 bg-red-50 border-red-200"
}

const getScoreLabel = (score: number) => {
  if (score >= 85) return "Excellent Match"
  if (score >= 70) return "Good Match"
  return "Needs Review"
}

export default function AIMatchingPage() {
  const [selectedJob, setSelectedJob] = useState("1")
  const [activeTab, setActiveTab] = useState("results")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleReprocessResumes = () => {
    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

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
                <Brain className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">AI Resume Matching</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">JobGenie HR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">AI-Powered Resume Matching</h2>
              <p className="text-muted-foreground">
                Automatically analyze and rank candidates using advanced AI algorithms
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleReprocessResumes} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Reprocess All
                  </>
                )}
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="results">Matching Results</TabsTrigger>
              <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
              <TabsTrigger value="settings">AI Settings</TabsTrigger>
            </TabsList>

            {/* Matching Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {/* Job Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Select Job Position
                  </CardTitle>
                  <CardDescription>Choose a job to see AI matching results for candidates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Select value={selectedJob} onValueChange={setSelectedJob}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Senior Frontend Developer - Engineering</SelectItem>
                          <SelectItem value="2">Product Manager - Product</SelectItem>
                          <SelectItem value="3">UX Designer - Design</SelectItem>
                          <SelectItem value="4">Data Scientist - Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Requirements Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Requirements Analysis</CardTitle>
                  <CardDescription>AI-extracted requirements from job description</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockJobRequirements.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="default">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Preferred Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockJobRequirements.preferredSkills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Experience Required</h4>
                      <p className="text-sm text-muted-foreground">{mockJobRequirements.minExperience}+ years</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Location</h4>
                      <p className="text-sm text-muted-foreground">{mockJobRequirements.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Matching Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Candidate Matches ({mockMatchingResults.length})</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Select defaultValue="score">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="score">AI Score</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                        <SelectItem value="date">Applied Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {mockMatchingResults.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold">{candidate.candidateName}</h4>
                            <Badge className={`${getScoreColor(candidate.overallScore)} border`}>
                              <Star className="h-3 w-3 mr-1" />
                              {candidate.overallScore}% {getScoreLabel(candidate.overallScore)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{candidate.email}</p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {candidate.experience} experience • {candidate.location} • Applied {candidate.appliedDate}
                          </p>
                          <p className="text-sm mb-4">{candidate.summary}</p>
                        </div>
                      </div>

                      {/* Detailed Scoring */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Skills Match</span>
                            <span className="text-sm">{candidate.skillsMatch}%</span>
                          </div>
                          <Progress value={candidate.skillsMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Experience Match</span>
                            <span className="text-sm">{candidate.experienceMatch}%</span>
                          </div>
                          <Progress value={candidate.experienceMatch} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Education Match</span>
                            <span className="text-sm">{candidate.educationMatch}%</span>
                          </div>
                          <Progress value={candidate.educationMatch} className="h-2" />
                        </div>
                      </div>

                      {/* Skills Analysis */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Matched Skills</h5>
                          <div className="flex flex-wrap gap-1">
                            {candidate.matchedSkills.map((skill) => (
                              <Badge key={skill} variant="default" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">Missing Skills</h5>
                          <div className="flex flex-wrap gap-1">
                            {candidate.missingSkills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Resume
                        </Button>
                        <Button size="sm" variant="outline">
                          Schedule Interview
                        </Button>
                        <div className="ml-auto">
                          <Button size="sm" variant="ghost">
                            Add to Shortlist
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Matching Accuracy
                    </CardTitle>
                    <CardDescription>AI model performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Overall Accuracy</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span>Skills Detection</span>
                        <span className="font-medium">96.8%</span>
                      </div>
                      <Progress value={96.8} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span>Experience Analysis</span>
                        <span className="font-medium">91.5%</span>
                      </div>
                      <Progress value={91.5} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Processing Statistics</CardTitle>
                    <CardDescription>Recent AI processing activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Resumes Processed Today</span>
                        <span className="font-medium">47</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average Processing Time</span>
                        <span className="font-medium">2.3s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>High-Quality Matches</span>
                        <span className="font-medium">23 (49%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Skills Extracted</span>
                        <span className="font-medium">342</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Skills Detected</CardTitle>
                    <CardDescription>Most frequently found skills in resumes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { skill: "JavaScript", count: 34, percentage: 72 },
                        { skill: "React", count: 28, percentage: 59 },
                        { skill: "Python", count: 25, percentage: 53 },
                        { skill: "TypeScript", count: 22, percentage: 47 },
                        { skill: "Node.js", count: 19, percentage: 40 },
                      ].map((item) => (
                        <div key={item.skill} className="flex items-center justify-between">
                          <span className="text-sm">{item.skill}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Model Performance</CardTitle>
                    <CardDescription>AI matching model insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Model Version</span>
                          <Badge variant="secondary">v2.1.3</Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Last Updated</span>
                          <span className="text-sm text-muted-foreground">2024-01-15</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Training Data</span>
                          <span className="text-sm text-muted-foreground">50K+ resumes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Confidence Threshold</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Matching Configuration</CardTitle>
                  <CardDescription>Customize how the AI analyzes and scores candidates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="skillsWeight">Skills Matching Weight (%)</Label>
                        <Input id="skillsWeight" type="number" defaultValue="40" min="0" max="100" />
                      </div>
                      <div>
                        <Label htmlFor="experienceWeight">Experience Weight (%)</Label>
                        <Input id="experienceWeight" type="number" defaultValue="35" min="0" max="100" />
                      </div>
                      <div>
                        <Label htmlFor="educationWeight">Education Weight (%)</Label>
                        <Input id="educationWeight" type="number" defaultValue="25" min="0" max="100" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="minScore">Minimum Match Score (%)</Label>
                        <Input id="minScore" type="number" defaultValue="70" min="0" max="100" />
                      </div>
                      <div>
                        <Label htmlFor="maxResults">Maximum Results to Show</Label>
                        <Input id="maxResults" type="number" defaultValue="50" min="1" max="200" />
                      </div>
                      <div>
                        <Label htmlFor="autoReprocess">Auto-reprocess New Resumes</Label>
                        <Select defaultValue="enabled">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enabled">Enabled</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Custom Keywords</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add custom keywords that the AI should prioritize when matching candidates
                    </p>
                    <Textarea
                      placeholder="Enter keywords separated by commas (e.g., leadership, team management, agile)"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-4">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>Save Configuration</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
