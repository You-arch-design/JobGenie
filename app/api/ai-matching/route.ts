import { type NextRequest, NextResponse } from "next/server"

// Mock AI matching service
// In a real implementation, this would call the Python script or AI service
export async function POST(request: NextRequest) {
  try {
    const { jobId, candidateIds, reprocessAll } = await request.json()

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock matching results
    const mockResults = [
      {
        candidateId: 1,
        candidateName: "John Doe",
        email: "john.doe@email.com",
        jobTitle: "Senior Frontend Developer",
        overallScore: 92,
        skillsMatch: 88,
        experienceMatch: 95,
        educationMatch: 90,
        matchedSkills: ["React", "TypeScript", "Next.js"],
        missingSkills: ["GraphQL"],
        summary:
          "Highly experienced frontend developer with strong React and TypeScript skills. Perfect match for senior role.",
        extractedSkills: ["React", "TypeScript", "Next.js", "Node.js", "JavaScript", "HTML", "CSS"],
        experienceYears: 6,
        education: "Bachelor of Science in Computer Science",
        processedAt: new Date().toISOString(),
      },
      {
        candidateId: 2,
        candidateName: "Jane Smith",
        email: "jane.smith@email.com",
        jobTitle: "Senior Frontend Developer",
        overallScore: 87,
        skillsMatch: 85,
        experienceMatch: 90,
        educationMatch: 85,
        matchedSkills: ["React", "JavaScript"],
        missingSkills: ["TypeScript", "Next.js"],
        summary: "Experienced developer with strong React background. Would benefit from TypeScript training.",
        extractedSkills: ["React", "Vue.js", "JavaScript", "CSS", "HTML"],
        experienceYears: 8,
        education: "Bachelor of Arts in Web Design",
        processedAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({
      success: true,
      results: mockResults,
      processedCount: mockResults.length,
      processingTime: "2.3s",
      modelVersion: "v2.1.3",
    })
  } catch (error) {
    console.error("AI matching error:", error)
    return NextResponse.json({ success: false, error: "Failed to process AI matching" }, { status: 500 })
  }
}

// Get AI matching results
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get("jobId")
  const minScore = searchParams.get("minScore") || "70"

  // Mock stored results
  const mockResults = [
    {
      candidateId: 1,
      candidateName: "John Doe",
      email: "john.doe@email.com",
      jobId: jobId,
      overallScore: 92,
      skillsMatch: 88,
      experienceMatch: 95,
      educationMatch: 90,
      lastProcessed: "2024-01-18T10:30:00Z",
    },
    {
      candidateId: 2,
      candidateName: "Jane Smith",
      email: "jane.smith@email.com",
      jobId: jobId,
      overallScore: 87,
      skillsMatch: 85,
      experienceMatch: 90,
      educationMatch: 85,
      lastProcessed: "2024-01-18T10:30:00Z",
    },
  ]

  // Filter by minimum score
  const filteredResults = mockResults.filter((result) => result.overallScore >= Number.parseInt(minScore))

  return NextResponse.json({
    success: true,
    results: filteredResults,
    totalCount: filteredResults.length,
    filters: { jobId, minScore },
  })
}
