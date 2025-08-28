"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Briefcase } from "lucide-react"
import Link from "next/link"

export default function NewJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    benefits: "",
    remote: false,
    urgent: false,
  })

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Job posting data:", { ...formData, skills })
    alert("Job posted successfully!")
  }

  const saveDraft = () => {
    console.log("Saving draft:", { ...formData, skills })
    alert("Draft saved!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/hr/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">JobGenie HR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Post New Job</h1>
            <p className="text-muted-foreground">Create a new job posting to attract top talent.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential details about the position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Senior Frontend Developer"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Employment Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      placeholder="80000"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      placeholder="120000"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote"
                      checked={formData.remote}
                      onCheckedChange={(checked) => handleInputChange("remote", checked as boolean)}
                    />
                    <Label htmlFor="remote">Remote work available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={formData.urgent}
                      onCheckedChange={(checked) => handleInputChange("urgent", checked as boolean)}
                    />
                    <Label htmlFor="urgent">Urgent hiring</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>Detailed information about the role and responsibilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    rows={8}
                    placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    rows={6}
                    placeholder="List the required qualifications, experience, and skills..."
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea
                    id="benefits"
                    rows={4}
                    placeholder="Describe the benefits, perks, and what makes your company great..."
                    value={formData.benefits}
                    onChange={(e) => handleInputChange("benefits", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>Add the key skills and technologies required for this position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g. React, Python, etc.)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6">
              <Button type="button" variant="outline" onClick={saveDraft}>
                Save as Draft
              </Button>
              <div className="flex items-center gap-4">
                <Link href="/hr/dashboard">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">Publish Job</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
