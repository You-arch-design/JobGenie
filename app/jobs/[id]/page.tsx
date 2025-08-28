import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Building, Calendar, Bookmark } from "lucide-react"
import Link from "next/link"

// Mock job data - in a real app, this would come from a database
const mockJob = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120k - $160k",
  posted: "2 days ago",
  description: `We're looking for a senior frontend developer to join our growing team and help build the next generation of our web applications.

As a Senior Frontend Developer, you'll be responsible for creating exceptional user experiences using modern web technologies. You'll work closely with our design and backend teams to deliver high-quality, scalable solutions.

Key Responsibilities:
• Develop and maintain complex web applications using React and TypeScript
• Collaborate with designers to implement pixel-perfect UI components
• Optimize applications for maximum speed and scalability
• Mentor junior developers and contribute to code reviews
• Stay up-to-date with the latest frontend technologies and best practices

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote options
• Professional development budget
• Modern office with great amenities
• Collaborative and inclusive team culture`,
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest", "Cypress"],
  requirements: [
    "5+ years of experience in frontend development",
    "Expert knowledge of React and TypeScript",
    "Experience with modern build tools and workflows",
    "Strong understanding of web performance optimization",
    "Experience with testing frameworks",
    "Excellent communication and collaboration skills",
  ],
  benefits: [
    "Health, dental, and vision insurance",
    "401(k) with company matching",
    "Flexible PTO policy",
    "Remote work options",
    "Professional development budget",
    "Stock options",
  ],
  remote: true,
  companyInfo: {
    name: "TechCorp Inc.",
    size: "200-500 employees",
    industry: "Technology",
    founded: "2015",
    description:
      "TechCorp is a leading technology company focused on building innovative solutions for modern businesses.",
  },
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Jobs</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Job
              </Button>
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockJob.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-primary">{mockJob.company}</CardDescription>
                  </div>
                  {mockJob.remote && (
                    <Badge variant="secondary" className="text-sm">
                      Remote Friendly
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {mockJob.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {mockJob.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {mockJob.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Posted {mockJob.posted}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {mockJob.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockJob.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockJob.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle>Apply for this position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/jobs/${mockJob.id}/apply`}>
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save for Later
                </Button>
                <Separator />
                <div className="text-sm text-muted-foreground text-center">
                  <p>Application deadline: 30 days from posting</p>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {mockJob.companyInfo.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{mockJob.companyInfo.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Company Size:</span>
                    <span>{mockJob.companyInfo.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Industry:</span>
                    <span>{mockJob.companyInfo.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Founded:</span>
                    <span>{mockJob.companyInfo.founded}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  View Company Profile
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Frontend Developer", company: "StartupABC", salary: "$100k - $130k" },
                  { title: "React Developer", company: "WebCorp", salary: "$110k - $140k" },
                  { title: "UI Developer", company: "DesignTech", salary: "$95k - $125k" },
                ].map((job, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer">
                    <h4 className="font-medium text-sm">{job.title}</h4>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                    <p className="text-xs text-primary font-medium">{job.salary}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  View More Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
