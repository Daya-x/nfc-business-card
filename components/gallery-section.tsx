"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import Image from "next/image"

interface GalleryItem {
  id: number
  title: string
  image: string
}

interface GallerySectionProps {
  data: GalleryItem[]
}

export function GallerySection({ data }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedImage(item)}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <div className="relative">
           <button
  onClick={() => setSelectedImage(null)}
  className="absolute -top-12 right-0 z-50 p-2 text-white hover:text-gray-300 transition-colors"
  aria-label="Close"
>
  <X className="w-6 h-6" />
</button>
            {selectedImage && (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  fill
                  className="object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                  <h3 className="text-white text-lg font-semibold">{selectedImage.title}</h3>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
