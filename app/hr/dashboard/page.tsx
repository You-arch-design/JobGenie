"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bot } from "lucide-react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Filter,
} from "lucide-react"
import Link from "next/link"

// Mock data for HR dashboard
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "active",
    applicants: 24,
    posted: "2024-01-15",
    deadline: "2024-02-15",
    salary: "$120k - $160k",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    status: "active",
    applicants: 18,
    posted: "2024-01-10",
    deadline: "2024-02-10",
    salary: "$100k - $140k",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Los Angeles, CA",
    type: "Full-time",
    status: "closed",
    applicants: 31,
    posted: "2024-01-05",
    deadline: "2024-01-25",
    salary: "$90k - $130k",
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "Analytics",
    location: "Remote",
    type: "Contract",
    status: "draft",
    applicants: 0,
    posted: "2024-01-18",
    deadline: "2024-02-18",
    salary: "$80k - $120k",
  },
]

const mockApplicants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-16",
    status: "under_review",
    experience: "6 years",
    location: "San Francisco, CA",
    score: 85,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-01-17",
    status: "interview_scheduled",
    experience: "8 years",
    location: "Remote",
    score: 92,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    jobTitle: "Product Manager",
    appliedDate: "2024-01-14",
    status: "accepted",
    experience: "5 years",
    location: "New York, NY",
    score: 88,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    jobTitle: "UX Designer",
    appliedDate: "2024-01-12",
    status: "rejected",
    experience: "4 years",
    location: "Los Angeles, CA",
    score: 72,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "closed":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "draft":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "under_review":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "interview_scheduled":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "accepted":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Active"
    case "closed":
      return "Closed"
    case "draft":
      return "Draft"
    case "under_review":
      return "Under Review"
    case "interview_scheduled":
      return "Interview Scheduled"
    case "accepted":
      return "Accepted"
    case "rejected":
      return "Rejected"
    default:
      return status
  }
}

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">JobGenie HR</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost">View Public Site</Button>
              </Link>
              <Link href="/hr/chatbot">
                <Button variant="outline">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Assistant
                </Button>
              </Link>
              <Button variant="outline">Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">HR Dashboard</h2>
          <p className="text-muted-foreground">Manage your job postings and track applicants.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12%</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest candidate applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplicants.slice(0, 4).map((applicant) => (
                      <div key={applicant.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-muted-foreground">{applicant.jobTitle}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(applicant.status)} text-xs`}>
                            {getStatusText(applicant.status)}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{applicant.appliedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Jobs</CardTitle>
                  <CardDescription>Jobs with most applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockJobs
                      .filter((job) => job.status === "active")
                      .sort((a, b) => b.applicants - a.applicants)
                      .slice(0, 4)
                      .map((job) => (
                        <div key={job.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.department}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{job.applicants} applicants</p>
                            <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Job Postings</h3>
              <Link href="/hr/jobs/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search jobs..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.salary}</p>
                        </div>
                      </TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(job.status)}`}>{getStatusText(job.status)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {job.applicants}
                        </div>
                      </TableCell>
                      <TableCell>{job.posted}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Job
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              View Applicants
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent value="applicants" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">All Applicants</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search applicants..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {mockJobs.map((job) => (
                    <SelectItem key={job.id} value={job.title}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Job Applied</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-muted-foreground">{applicant.email}</p>
                          <p className="text-sm text-muted-foreground">{applicant.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>{applicant.jobTitle}</TableCell>
                      <TableCell>{applicant.appliedDate}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(applicant.status)}`}>
                          {getStatusText(applicant.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{applicant.experience}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              applicant.score >= 85
                                ? "bg-green-500"
                                : applicant.score >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          {applicant.score}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Schedule Interview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Application
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-2xl font-bold">Hiring Analytics</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                  <CardDescription>Applications received over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Application trends over the last 6 months
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hiring Funnel</CardTitle>
                  <CardDescription>Conversion rates through hiring stages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Applications</span>
                      <span className="font-medium">247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Screening</span>
                      <span className="font-medium">89 (36%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Interviews</span>
                      <span className="font-medium">34 (14%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Offers</span>
                      <span className="font-medium">12 (5%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Hires</span>
                      <span className="font-medium">8 (3%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Skills in Demand</CardTitle>
                  <CardDescription>Most requested skills across job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { skill: "React", count: 8 },
                      { skill: "TypeScript", count: 7 },
                      { skill: "Python", count: 6 },
                      { skill: "Node.js", count: 5 },
                      { skill: "AWS", count: 4 },
                    ].map((item) => (
                      <div key={item.skill} className="flex items-center justify-between">
                        <span>{item.skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(item.count / 8) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time to Hire</CardTitle>
                  <CardDescription>Average days from application to hire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">18</div>
                    <p className="text-muted-foreground">Average days</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Engineering</span>
                        <span>22 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Product</span>
                        <span>16 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Design</span>
                        <span>14 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
