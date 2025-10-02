import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"

interface CompanyData {
   logo?: string
  name: string
  about: string[]  // array of paragraphs
  services: string[]
  address: string
  mapLink: string
}

interface CompanySectionProps {
  data: CompanyData
}

export function CompanySection({ data }: CompanySectionProps) {
  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card>
          <CardContent className="p-6">
           {/* Logo above company name */}
            <div className="flex flex-col items-center mb-4">
              {data.logo && (
                 <Image
                    src={data.logo}
                    alt={`${data.name} Logo`}
                    width={280}
                    height={280}
                    className="rounded-sm mb-2 object-cover"
                     />
                 )}
      <h2 className="text-3xl font-bold text-foreground text-center">{data.name}</h2>
    </div>

    {/* About section */}
    <div className="text-muted-foreground leading-relaxed space-y-4 mb-6">
      {data.about.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>

    {/* Address + Map */}
    <div className="flex items-center gap-2 text-muted-foreground">
      <MapPin className="w-4 h-4" />
      <span className="text-sm">{data.address}</span>
      <Button asChild variant="ghost" size="sm" className="ml-2 p-1 h-auto">
        <a href={data.mapLink} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          <span className="sr-only">View on Google Maps</span>
        </a>
      </Button>
    </div>
  </CardContent>
</Card>

      {/* Services */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">What We Do</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-muted rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}