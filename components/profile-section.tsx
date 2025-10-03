import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail, Linkedin, Instagram,FileText } from "lucide-react"
import Image from "next/image"

interface ProfileData {
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

interface ProfileSectionProps {
  data: ProfileData
}

export function ProfileSection({ data }: ProfileSectionProps) {
  const contactActions = [
    {
      icon: Phone,
      label: "Call",
      href: `tel:${data.contacts.phone}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${data.contacts.whatsapp.replace(/\D/g, "")}`,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${data.contacts.email}`,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: data.contacts.linkedin,
      color: "bg-blue-600 hover:bg-blue-700",
    },
      {
      icon: Instagram,
      label: "Instagram",
      href: data.contacts.instagram,
      color: "bg-pink-500 hover:bg-red-600",
    },
    {
      icon: FileText,
      label: "Resume",
      href: data.contacts.Resume,
      color: "bg-gray-800 hover:bg-gray-900",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 mx-auto md:mx-0">
                <Image
                  src={data.image || "/placeholder.svg"}
                  alt={data.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-foreground mb-2">{data.name}</h2>
              <p className="text-xl text-primary mb-4">{data.title}</p>
              <p className="text-muted-foreground leading-relaxed">{data.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {contactActions.map((action) => (
              <Button
                key={action.label}
                asChild
                className={`${action.color} text-white border-0 flex flex-col h-auto py-4 px-3`}
              >
                <a href={action.href} target="_blank" rel="noopener noreferrer">
                  <action.icon className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">{action.label}</span>
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
