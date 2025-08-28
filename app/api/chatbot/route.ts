import { type NextRequest, NextResponse } from "next/server"

// Mock candidate database
const mockCandidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    position: "Senior Frontend Developer",
    score: 92,
    skills: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL"],
    experience: 6,
    location: "San Francisco, CA",
    appliedDate: "2024-01-16",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    position: "Senior Frontend Developer",
    score: 87,
    skills: ["React", "Vue.js", "JavaScript", "CSS", "HTML"],
    experience: 8,
    location: "Remote",
    appliedDate: "2024-01-17",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    position: "Java Developer",
    score: 85,
    skills: ["Java", "Spring", "MySQL", "AWS", "Docker"],
    experience: 5,
    location: "New York, NY",
    appliedDate: "2024-01-15",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    position: "Java Developer",
    score: 88,
    skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes"],
    experience: 7,
    location: "Austin, TX",
    appliedDate: "2024-01-14",
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex.chen@email.com",
    position: "Python Developer",
    score: 90,
    skills: ["Python", "Django", "PostgreSQL", "AWS", "Redis"],
    experience: 4,
    location: "Seattle, WA",
    appliedDate: "2024-01-18",
  },
]

class HRChatbot {
  private candidates = mockCandidates

  async processQuery(query: string): Promise<{ content: string; data?: any }> {
    const queryLower = query.toLowerCase()

    // Intent recognition and response generation
    if (this.isTopCandidatesQuery(queryLower)) {
      return this.handleTopCandidatesQuery(queryLower)
    }

    if (this.isSkillBasedQuery(queryLower)) {
      return this.handleSkillBasedQuery(queryLower)
    }

    if (this.isLocationBasedQuery(queryLower)) {
      return this.handleLocationBasedQuery(queryLower)
    }

    if (this.isExperienceBasedQuery(queryLower)) {
      return this.handleExperienceBasedQuery(queryLower)
    }

    if (this.isStatsQuery(queryLower)) {
      return this.handleStatsQuery()
    }

    // Default response
    return {
      content:
        "I can help you find candidates based on skills, experience, location, or scores. Try asking: 'Show me top Java developers', 'Find React candidates with 5+ years', or 'Who are the highest scoring candidates?'",
    }
  }

  private isTopCandidatesQuery(query: string): boolean {
    return query.includes("top") || query.includes("best") || query.includes("highest")
  }

  private isSkillBasedQuery(query: string): boolean {
    const skills = ["java", "react", "python", "javascript", "typescript", "node", "aws", "docker"]
    return skills.some((skill) => query.includes(skill))
  }

  private isLocationBasedQuery(query: string): boolean {
    const locations = ["seattle", "san francisco", "new york", "austin", "remote"]
    return locations.some((location) => query.includes(location))
  }

  private isExperienceBasedQuery(query: string): boolean {
    return query.includes("experience") || query.includes("years")
  }

  private isStatsQuery(query: string): boolean {
    return query.includes("stats") || query.includes("summary") || query.includes("recent")
  }

  private handleTopCandidatesQuery(query: string): { content: string; data: any } {
    let candidates = [...this.candidates]

    // Check for specific skill in top query
    if (query.includes("java")) {
      candidates = candidates.filter((c) => c.skills.some((skill) => skill.toLowerCase().includes("java")))
    } else if (query.includes("react")) {
      candidates = candidates.filter((c) => c.skills.some((skill) => skill.toLowerCase().includes("react")))
    } else if (query.includes("python")) {
      candidates = candidates.filter((c) => c.skills.some((skill) => skill.toLowerCase().includes("python")))
    }

    // Sort by score and limit results
    const topCandidates = candidates.sort((a, b) => b.score - a.score).slice(0, 5)

    const skillType = query.includes("java")
      ? "Java"
      : query.includes("react")
        ? "React"
        : query.includes("python")
          ? "Python"
          : ""

    return {
      content: `Here are the top ${topCandidates.length} ${skillType} ${skillType ? "developers" : "candidates"} based on AI matching scores:`,
      data: { type: "candidates", candidates: topCandidates },
    }
  }

  private handleSkillBasedQuery(query: string): { content: string; data: any } {
    let skill = ""
    let minExperience = 0

    // Extract skill
    if (query.includes("java")) skill = "java"
    else if (query.includes("react")) skill = "react"
    else if (query.includes("python")) skill = "python"
    else if (query.includes("javascript")) skill = "javascript"
    else if (query.includes("aws")) skill = "aws"

    // Extract experience requirement
    const experienceMatch = query.match(/(\d+)\+?\s*years?/)
    if (experienceMatch) {
      minExperience = Number.parseInt(experienceMatch[1])
    }

    let filteredCandidates = this.candidates.filter((candidate) =>
      candidate.skills.some((candidateSkill) => candidateSkill.toLowerCase().includes(skill)),
    )

    if (minExperience > 0) {
      filteredCandidates = filteredCandidates.filter((candidate) => candidate.experience >= minExperience)
    }

    const sortedCandidates = filteredCandidates.sort((a, b) => b.score - a.score)

    const experienceText = minExperience > 0 ? ` with ${minExperience}+ years of experience` : ""

    return {
      content: `Found ${sortedCandidates.length} ${skill} developers${experienceText}:`,
      data: { type: "candidates", candidates: sortedCandidates },
    }
  }

  private handleLocationBasedQuery(query: string): { content: string; data: any } {
    let location = ""
    let skill = ""

    // Extract location
    if (query.includes("seattle")) location = "seattle"
    else if (query.includes("san francisco")) location = "san francisco"
    else if (query.includes("new york")) location = "new york"
    else if (query.includes("austin")) location = "austin"
    else if (query.includes("remote")) location = "remote"

    // Extract skill if mentioned
    if (query.includes("java")) skill = "java"
    else if (query.includes("react")) skill = "react"
    else if (query.includes("python")) skill = "python"

    let filteredCandidates = this.candidates.filter((candidate) => candidate.location.toLowerCase().includes(location))

    if (skill) {
      filteredCandidates = filteredCandidates.filter((candidate) =>
        candidate.skills.some((candidateSkill) => candidateSkill.toLowerCase().includes(skill)),
      )
    }

    const sortedCandidates = filteredCandidates.sort((a, b) => b.score - a.score)

    const skillText = skill ? `${skill} ` : ""
    const locationText = location.charAt(0).toUpperCase() + location.slice(1)

    return {
      content: `Found ${sortedCandidates.length} ${skillText}developers in ${locationText}:`,
      data: { type: "candidates", candidates: sortedCandidates },
    }
  }

  private handleExperienceBasedQuery(query: string): { content: string; data: any } {
    const experienceMatch = query.match(/(\d+)\+?\s*years?/)
    const minExperience = experienceMatch ? Number.parseInt(experienceMatch[1]) : 5

    const experiencedCandidates = this.candidates
      .filter((candidate) => candidate.experience >= minExperience)
      .sort((a, b) => b.score - a.score)

    return {
      content: `Found ${experiencedCandidates.length} candidates with ${minExperience}+ years of experience:`,
      data: { type: "candidates", candidates: experiencedCandidates },
    }
  }

  private handleStatsQuery(): { content: string; data: any } {
    const totalApplications = this.candidates.length
    const thisWeek = Math.floor(totalApplications * 0.3) // Mock recent applications
    const averageScore = Math.round(this.candidates.reduce((sum, c) => sum + c.score, 0) / totalApplications)

    // Get top skills
    const skillCounts: { [key: string]: number } = {}
    this.candidates.forEach((candidate) => {
      candidate.skills.forEach((skill) => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1
      })
    })

    const topSkills = Object.entries(skillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([skill]) => skill)

    return {
      content: "Here's a summary of your current talent pipeline:",
      data: {
        type: "stats",
        stats: {
          totalApplications,
          thisWeek,
          averageScore,
          topSkills,
        },
      },
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const chatbot = new HRChatbot()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await chatbot.processQuery(query)

    return NextResponse.json({
      success: true,
      response: response.content,
      data: response.data,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chatbot error:", error)
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}
