"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, FileText, Linkedin, Mail, Phone, User } from "lucide-react"
import Link from "next/link"

export default function JobApplicationPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    coverLetter: "",
    agreedToTerms: false,
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Application submitted:", { formData, resumeFile })
    alert("Application submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href={`/jobs/${params.id}`} className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Job Details</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Apply for Position</h1>
            <p className="text-muted-foreground">Senior Frontend Developer at TechCorp Inc.</p>
          </div>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>Please fill out all required fields to submit your application.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        type="url"
                        className="pl-10"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedinUrl}
                        onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resume & Documents
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Upload Resume *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        required
                      />
                      <label htmlFor="resume" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          {resumeFile ? resumeFile.name : "Click to upload your resume"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cover Letter</h3>
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Tell us why you're interested in this position (Optional)</Label>
                    <Textarea
                      id="coverLetter"
                      rows={6}
                      placeholder="Share your motivation, relevant experience, and what makes you a great fit for this role..."
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      . I consent to the processing of my personal data for recruitment purposes.
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" className="w-full" size="lg" disabled={!formData.agreedToTerms}>
                    Submit Application
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    You'll receive a confirmation email once your application is submitted.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Application Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Application Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Ensure your resume is up-to-date and highlights relevant experience
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Customize your cover letter to show genuine interest in the role
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Double-check all contact information for accuracy
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Include a professional LinkedIn profile if available
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
