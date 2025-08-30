import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, DollarSign, Users, Briefcase, FileText, Sparkles, Target } from "lucide-react"
import Link from "next/link"

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
    description: "We're looking for a senior frontend developer to join our growing team...",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    remote: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    posted: "1 week ago",
    description: "Join our product team to drive innovation and user experience...",
    skills: ["Product Strategy", "Analytics", "Agile", "User Research"],
    remote: false,
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataFlow Solutions",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $120k",
    posted: "3 days ago",
    description: "Analyze complex datasets and build predictive models...",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    remote: true,
  },
  {
    id: 4,
    title: "UX Designer",
    company: "Design Studio Pro",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$90k - $130k",
    posted: "5 days ago",
    description: "Create beautiful and intuitive user experiences...",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    remote: true,
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110k - $150k",
    posted: "1 day ago",
    description: "Build scalable backend systems and APIs...",
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    remote: false,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "InfraCorp",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$105k - $145k",
    posted: "4 days ago",
    description: "Manage cloud infrastructure and deployment pipelines...",
    skills: ["Kubernetes", "Terraform", "CI/CD", "Monitoring"],
    remote: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">JobGenie</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/resume-analyzer">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Resume Analyzer
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">One Click, A Thousand Opportunities</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Smart matches that bring your skills to the right role – JobGenie Delivers
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6 hover-lift">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Job title, keywords, or company" className="pl-10" />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Location" className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="md:w-auto">
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Job Seekers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground">Opportunities Waiting for You</h3>
            <Button variant="outline">View All Jobs</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                      <CardDescription className="font-medium text-primary">{job.company}</CardDescription>
                    </div>
                    {job.remote && <Badge variant="secondary">Work from Anywhere 🌍</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      {`Competitive Package: ${job.salary.replace(" - ", "–")}`}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {job.posted.includes("ago") ? `Posted ${job.posted.replace(" ago", " back")} – still fresh!` : job.posted}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="pt-2">
                      <Link href={`/jobs/${job.id}`}>
                        <Button className="w-full">See Why You’re a Match</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Analyzer Section */}
      <section className="py-16 bg-gradient-to-r from-secondary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              AI-Powered Resume Analysis
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Get instant feedback on your resume with our intelligent AI analyzer. Optimize for ATS systems, 
              highlight key skills, and receive personalized improvement suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resume-analyzer">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try Resume Analyzer
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Target className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 text-balance">Ready to Take the Next Step?</h3>
          <p className="text-xl mb-8 text-pretty max-w-2xl mx-auto opacity-90">
            Join thousands of professionals who have found their perfect job through JobGenie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">
                <Users className="mr-2 h-5 w-5" />
                Join as Candidate
              </Button>
            </Link>
            <Link href="/hr/register">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Post Jobs (HR)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">JobGenie</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting talent with opportunity through intelligent matching and seamless experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/jobs" className="hover:text-foreground">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    My Applications
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-foreground">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/hr/post-job" className="hover:text-foreground">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/hr/dashboard" className="hover:text-foreground">
                    HR Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/hr/candidates" className="hover:text-foreground">
                    Find Candidates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 JobGenie. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Resume Analyzer Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/resume-analyzer">
          <Button 
            size="lg" 
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
          >
            <FileText className="h-5 w-5 mr-2" />
            Resume AI
          </Button>
        </Link>
      </div>
    </div>
  )
}
