"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Upload,
  Eye,
  Download,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock application data
const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    appliedDate: "2024-01-15",
    status: "under_review",
    salary: "$120k - $160k",
    location: "San Francisco, CA",
    lastUpdate: "2024-01-18",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    appliedDate: "2024-01-10",
    status: "interview_scheduled",
    salary: "$100k - $140k",
    location: "New York, NY",
    lastUpdate: "2024-01-16",
    interviewDate: "2024-01-22",
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    company: "Design Studio Pro",
    appliedDate: "2024-01-08",
    status: "rejected",
    salary: "$90k - $130k",
    location: "Los Angeles, CA",
    lastUpdate: "2024-01-14",
  },
  {
    id: 4,
    jobTitle: "Data Scientist",
    company: "DataFlow Solutions",
    appliedDate: "2024-01-12",
    status: "accepted",
    salary: "$80k - $120k",
    location: "Remote",
    lastUpdate: "2024-01-17",
  },
]

// Mock saved jobs
const mockSavedJobs = [
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    salary: "$110k - $150k",
    posted: "1 day ago",
    remote: false,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "InfraCorp",
    location: "Austin, TX",
    salary: "$105k - $145k",
    posted: "4 days ago",
    remote: true,
  },
]

// Mock profile data
const mockProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  linkedinUrl: "https://linkedin.com/in/johndoe",
  location: "San Francisco, CA",
  title: "Senior Frontend Developer",
  summary:
    "Experienced frontend developer with 6+ years of experience building scalable web applications using React, TypeScript, and modern web technologies.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest", "Node.js"],
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "WebTech Solutions",
      duration: "2022 - Present",
      description:
        "Lead frontend development for multiple client projects, mentoring junior developers and implementing best practices.",
    },
    {
      title: "Frontend Developer",
      company: "StartupABC",
      duration: "2020 - 2022",
      description:
        "Built responsive web applications using React and TypeScript, collaborated with design team on UI/UX improvements.",
    },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "under_review":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "interview_scheduled":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "accepted":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "under_review":
      return <AlertCircle className="h-4 w-4" />
    case "interview_scheduled":
      return <Clock className="h-4 w-4" />
    case "accepted":
      return <CheckCircle className="h-4 w-4" />
    case "rejected":
      return <XCircle className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "under_review":
      return "Under Review"
    case "interview_scheduled":
      return "Interview Scheduled"
    case "accepted":
      return "Accepted"
    case "rejected":
      return "Rejected"
    default:
      return "Applied"
  }
}

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("applications")
  const [profileData, setProfileData] = useState(mockProfile)

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

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
              <Link href="/">
                <Button variant="ghost">Browse Jobs</Button>
              </Link>
              <Button variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, {profileData.firstName}!</h2>
          <p className="text-muted-foreground">Track your applications and manage your job search.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">My Applications</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search applications..." className="pl-10 w-64" />
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {mockApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-1">{application.jobTitle}</h4>
                            <p className="text-primary font-medium mb-2">{application.company}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {application.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {application.salary}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Applied {application.appliedDate}
                              </div>
                            </div>

                            {application.interviewDate && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                                <p className="text-sm font-medium text-blue-800">
                                  Interview scheduled for {application.interviewDate}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                              {getStatusIcon(application.status)}
                              {getStatusText(application.status)}
                            </Badge>
                            <p className="text-xs text-muted-foreground">Updated {application.lastUpdate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                      <Link href={`/jobs/${application.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Job
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Application
                      </Button>
                      {application.status === "interview_scheduled" && <Button size="sm">Join Interview</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Saved Jobs</h3>
              <p className="text-muted-foreground">{mockSavedJobs.length} saved jobs</p>
            </div>

            <div className="grid gap-4">
              {mockSavedJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1">{job.title}</h4>
                        <p className="text-primary font-medium mb-2">{job.company}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </div>
                        </div>
                      </div>

                      {job.remote && <Badge variant="secondary">Remote</Badge>}
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                      <Link href={`/jobs/${job.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        Remove from Saved
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Profile Settings</h3>
              <Button>Save Changes</Button>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        className="pl-10"
                        value={profileData.linkedinUrl}
                        onChange={(e) => handleProfileUpdate("linkedinUrl", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        className="pl-10"
                        value={profileData.location}
                        onChange={(e) => handleProfileUpdate("location", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                  <CardDescription>Tell employers about your experience and career goals.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => handleProfileUpdate("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      rows={4}
                      value={profileData.summary}
                      onChange={(e) => handleProfileUpdate("summary", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Resume Management</h3>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Resume
              </Button>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Resume</CardTitle>
                  <CardDescription>Your active resume that will be sent with job applications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">John_Doe_Resume_2024.pdf</p>
                        <p className="text-sm text-muted-foreground">Uploaded on Jan 15, 2024 • 245 KB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resume History</CardTitle>
                  <CardDescription>Previous versions of your resume.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "John_Doe_Resume_2023.pdf", date: "Dec 20, 2023", size: "238 KB" },
                    { name: "John_Doe_Resume_Old.pdf", date: "Nov 15, 2023", size: "221 KB" },
                  ].map((resume, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{resume.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded on {resume.date} • {resume.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
