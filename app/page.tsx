"use client"

import { useState, useEffect } from "react"
import { ProfileSection } from "@/components/profile-section"
import { CompanySection } from "@/components/company-section"
import { GallerySection } from "@/components/gallery-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface BusinessCardData {
  profile: {
    name: string
    title: string
    bio: string
    image: string
    contacts: {
      phone: string
      whatsapp: string
      email: string
      linkedin: string
      instagram: string
      Resume: string
    }
  }
  company: {
    name: string
    about: string
    services: string[]
    address: string
    mapLink: string
  }
  gallery: Array<{
    id: number
    title: string
    image: string
  }>
}

export default function BusinessCard() {
  const [activeTab, setActiveTab] = useState("profile")
  const [data, setData] = useState<BusinessCardData | null>(null)

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const downloadVCard = () => {
    if (!data) return

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.profile.name}


TEL:${data.profile.contacts.phone}
EMAIL:${data.profile.contacts.email}



END:VCARD`

    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data.profile.name.replace(" ", "_")}.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{data.profile.name}</h1>
            <p className="text-muted-foreground">{data.profile.title}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={downloadVCard} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Contact
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg">
          {[
            { id: "profile", label: "Profile" },
            { id: "company", label: "Company" },
            { id: "gallery", label: "Gallery" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-in fade-in-50 duration-200">
          {activeTab === "profile" && <ProfileSection data={data.profile} />}
          {activeTab === "company" && <CompanySection data={data.company} />}
          {activeTab === "gallery" && <GallerySection data={data.gallery} />}
        </div>
      </div>
    </div>
  )
}
