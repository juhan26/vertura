"use client"

import { useState, useEffect } from "react"
import Image, { StaticImageData } from "next/image"
import { Button } from "@/components/ui/button"
import ons1 from "@/public/events/boxing/ons1.jpg"
import ons2 from "@/public/events/boxing/ons2.jpg"
import ons3 from "@/public/events/boxing/ons3.jpg"
import ons4 from "@/public/events/boxing/ons4.jpg"
import ons5 from "@/public/events/boxing/ons5.jpg"
import ons6 from "@/public/events/boxing/ons6.jpg"
import ons7 from "@/public/events/boxing/ons7.jpg"
import sos1 from "@/public/events/SOS/sos1.jpg"
import sos2 from "@/public/events/SOS/sos2.jpg"
import sos3 from "@/public/events/SOS/sos3.jpg"
import sos4 from "@/public/events/SOS/sos4.jpg"
import sos5 from "@/public/events/SOS/sos5.jpg"
import { Calendar, MapPin, Users, Heart, ArrowRight, Camera, X, ChevronLeft, ChevronRight } from "lucide-react"
import { SponsorshipEvent, FilterCategory } from "@/types/sponsorshipType"

interface GalleryImage {
  id: number
  src: StaticImageData
  caption: string
  category: "behind-scenes" | "runway" | "crowd" | "product" | "artist"
}

interface ExtendedSponsorshipEvent extends SponsorshipEvent {
  gallery: GalleryImage[]
}

const sponsorshipEvents: ExtendedSponsorshipEvent[] = [
  {
    id: 1,
    title: "Selasa Selalu Skate",
    date: "July 14 (Every Tuesday), 2025",
    location: "SOSKATE PARK",
    category: "Skate",
    imageSrc: sos5,
    story: {
      brief: "VERTURA became the official streetwear partner for SOS, where our Monte Carlo collection made waves on the skate area.",
      details: "Ketika lampu sorot menyinari area skate di SOS, ada 2 orang model mengenakan koleksi terbaru VERTURA. Momen ini bukan hanya tentang fashion, tapi tentang bagaimana budaya lokal bertemu. Fotografer backstage menangkap candid moments para model yang dengan bangga mengenakan Monte Carlo Boxy Tee, menciptakan buzz di media sosial dengan hashtag #WearTheCultureWithATwist.",
      impact: "15+ media coverage, 6K social media impressions",
      highlight: "Featured as 'Best Streetwear Brand' by Selasa Selalu Skate"
    },
    participants: 150,
    mediaReach: "100++ peoples",
    featured: true,
    gallery: [
      { id: 1, src: sos1, caption: "Model backstage menggunakan Monte Carlo Boxy Tee", category: "product" },
      { id: 2, src: sos2, caption: "VERTURA collection di runway SOS 2025", category: "product" },
      { id: 3, src: sos3, caption: "Audience reaction saat VERTURA showcase", category: "product" },
      { id: 4, src: sos4, caption: "Detail Monte Carlo collection", category: "product" },
      { id: 5, src: sos5, caption: "Tim VERTURA bersama model", category: "product" },
    ]
  },
  {
    id: 2,
    title: "Boxing One Night Showdown",
    date: "September 8, 2023",
    location: "Auditorium M. Yusuf Abu Bakar | Universitas Mataram",
    category: "Boxing",
    imageSrc: ons3,
    story: {
      brief: "VERTURA menjadi apparel partner eksklusif untuk ajang tinju profesional terbesar di Indonesia, mendandani atlet dan crew dengan koleksi premium.",
      details: "Di bawah sorotan lampu Istora Senayan, VERTURA hadir sebagai bagian tak terpisahkan dari energi petinju profesional Indonesia. Setiap atlet yang tampil mengenakan robe khusus VERTURA dengan desain yang mencerminkan semangat juang dan ketangguhan. Backstage, terlihat para cornerman dan official event menggunakan apparel VERTURA yang nyaman namun tetap stylish. Dokumentasi photography menangkap momen-momen intens seperti persiapan petinju, duel di ring, dan celebrasi kemenangan - semuanya dengan sentuhan fashion streetwear yang menjadi signature VERTURA. Kolaborasi ini membuktikan bahwa brand culture dapat menyatu dengan semangat olahraga yang penuh adrenalin.",
      impact: "5,000 live attendees, 1.2M social media impressions",
      highlight: "Official apparel partner for all fighters and event crew"
    },
    participants: 2000,
    mediaReach: "1.2M",
    featured: true,
    gallery: [
      { id: 1, src: ons1, caption: "Petinju menggunakan baju VERTURA", category: "product" },
      { id: 2, src: ons2, caption: "Momen intens pertarungan di ring", category: "behind-scenes" },
      { id: 3, src: ons3, caption: "Petinju dengan apparel VERTURA backstage", category: "behind-scenes" },
      { id: 4, src: ons4, caption: "Boxer collaboration VERTURA x Jayak (Main Event)", category: "product" },
      { id: 5, src: ons5, caption: "Boxer collaboration VERTURA x Jayak (Main Event)", category: "product" },
      { id: 6, src: ons6, caption: "Boxer collaboration VERTURA x Jayak (Main Event)", category: "product" },
      { id: 7, src: ons7, caption: "Boxer collaboration VERTURA x Jayak (Main Event)", category: "product" },
    ]
  }
]

export default function SponsorshipStories() {
  const [selectedEvent, setSelectedEvent] = useState<ExtendedSponsorshipEvent | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [galleryFilter, setGalleryFilter] = useState<string>("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories: FilterCategory[] = ["all", "Skate", "Boxing"]
  const galleryCategories = ["all", "behind-scenes", "runway", "crowd", "product", "artist"]

  const filteredEvents = activeFilter === "all"
    ? sponsorshipEvents
    : sponsorshipEvents.filter(event => event.category === activeFilter)

  const openStoryModal = (event: ExtendedSponsorshipEvent) => {
    setSelectedEvent(event)
    setGalleryFilter("all")
  }

  const closeStoryModal = () => {
    setSelectedEvent(null)
    setSelectedImage(null)
    setGalleryFilter("all")
    setCurrentImageIndex(0)
  }

  const openImageModal = (image: GalleryImage) => {
    if (!selectedEvent) return

    const currentGallery = getFilteredGallery()
    const imageIndex = currentGallery.findIndex(img => img.id === image.id)
    setSelectedImage(image)
    setCurrentImageIndex(imageIndex)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
  }

  const getFilteredGallery = () => {
    if (!selectedEvent) return []
    return galleryFilter === "all"
      ? selectedEvent.gallery
      : selectedEvent.gallery.filter(img => img.category === galleryFilter)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage || !selectedEvent) return

    const currentGallery = getFilteredGallery()
    let newIndex

    if (direction === 'prev') {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentGallery.length - 1
    } else {
      newIndex = currentImageIndex < currentGallery.length - 1 ? currentImageIndex + 1 : 0
    }

    setSelectedImage(currentGallery[newIndex])
    setCurrentImageIndex(newIndex)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      } else if (e.key === 'Escape') {
        closeImageModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, currentImageIndex])

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';

    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs p-2';
    errorDiv.textContent = 'Image not available';

    target.parentNode?.appendChild(errorDiv);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 border border-gray-300 text-gray-700 text-sm mb-6 font-medium">
            OUR COLLABORATIONS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stories Behind Every
            <span className="block text-[#7EBDE6]">Sponsorship</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Setiap event yang kami sponsori memiliki cerita uniknya sendiri. Dari Event Selasa Selalu Skate hingga Event Boxing One Night Showdown, lihat bagaimana VERTURA hadir dan menciptakan momen bersejarah.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === category
                ? 'bg-black text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {category === "all" ? "All Events" : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${event.featured ? 'md:col-span-2 h-[500px]' : 'h-[400px]'
                }`}
            >
              {/* Background Image - Using Next.js Image component */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Image
                    src={event.imageSrc}
                    alt={event.title}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Gallery Badge */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <Camera className="h-3 w-3" />
                {event.gallery.length} Photos
              </div>

              {/* Content */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-end text-white">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[#7EBDE6] text-black text-xs font-bold rounded-full mb-3">
                    {event.category}
                  </span>
                  {event.featured && (
                    <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold rounded-full mb-3 ml-2">
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#7EBDE6] transition-colors">
                  {event.title}
                </h3>

                <p className="text-white/80 mb-6 leading-relaxed">
                  {event.story.brief}
                </p>

                {/* Event Meta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#7EBDE6]" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#7EBDE6]" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#7EBDE6]" />
                    <span className="text-sm">{event.participants.toLocaleString()} participants</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => openStoryModal(event)}
                  className="bg-white text-black hover:bg-[#7EBDE6] hover:text-black font-bold py-3 px-6 rounded-full w-fit group-hover:scale-105 transition-all duration-300"
                >
                  Read Full Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Story Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative h-64 md:h-80">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-2xl">
                  <Image
                    src={selectedEvent.imageSrc}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover rounded-t-2xl"
                    onError={handleImageError}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
                <button
                  onClick={closeStoryModal}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="inline-block px-3 py-1 bg-[#7EBDE6] text-black text-sm font-bold rounded-full mb-3">
                    {selectedEvent.category}
                  </span>
                  <h3 className="text-3xl font-bold">{selectedEvent.title}</h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Event Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Calendar className="h-6 w-6 text-[#7EBDE6] mx-auto mb-2" />
                    <p className="font-semibold">{selectedEvent.date}</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-6 w-6 text-[#7EBDE6] mx-auto mb-2" />
                    <p className="font-semibold">{selectedEvent.location}</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-6 w-6 text-[#7EBDE6] mx-auto mb-2" />
                    <p className="font-semibold">{selectedEvent.participants.toLocaleString()} People</p>
                  </div>
                </div>

                {/* Story Content */}
                <div className="prose max-w-none mb-12">
                  <h4 className="text-2xl font-bold mb-4">The Story</h4>
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {selectedEvent.story.details}
                  </p>

                  {/* Impact & Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-[#7EBDE6]/90 p-6 rounded-xl">
                      <h5 className="text-xl font-bold mb-3 text-[#294456]">Impact Metrics</h5>
                      <p className="text-gray-700">{selectedEvent.story.impact}</p>
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-2 text-[#294456]">
                          <Heart className="h-4 w-4" />
                          {selectedEvent.mediaReach} Media Reach
                        </span>
                      </div>
                    </div>
                    <div className="bg-black p-6 rounded-xl text-white">
                      <h5 className="text-xl font-bold mb-3">Key Highlight</h5>
                      <p>{selectedEvent.story.highlight}</p>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                <div className="border-t pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-2xl font-bold">Event Documentation</h4>
                    <span className="text-gray-500">
                      {getFilteredGallery().length} of {selectedEvent.gallery.length} photos
                    </span>
                  </div>

                  {/* Gallery Filter */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {galleryCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setGalleryFilter(cat)}
                        className={`px-4 py-2 text-sm rounded-full transition-all ${galleryFilter === cat
                          ? 'bg-[#7EBDE6] text-black font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {cat === "all" ? "All Photos" : cat.replace("-", " ").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </button>
                    ))}
                  </div>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getFilteredGallery().map((image) => (
                      <div
                        key={image.id}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => openImageModal(image)}
                      >
                        <div className="w-full h-full bg-gray-200">
                          <Image
                            src={image.src}
                            alt={image.caption}
                            fill
                            className="object-cover"
                            onError={handleImageError}
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <div className="text-center mt-8 pt-8 border-t">
                  <Button
                    onClick={closeStoryModal}
                    className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full"
                  >
                    Close Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center p-0 md:p-4">
            <div className="relative w-full h-full flex flex-col">
              {/* Top Bar - Mobile Only */}
              <div className="md:hidden flex items-center justify-between p-4 bg-black/80 text-white z-10">
                <span className="text-sm">
                  {currentImageIndex + 1} / {getFilteredGallery().length}
                </span>
                <button
                  onClick={closeImageModal}
                  className="p-2 rounded-full bg-black/50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Image Container */}
              <div className="flex-1 relative flex items-center justify-center">
                {/* Navigation Buttons - Desktop */}
                <button
                  onClick={() => navigateImage('prev')}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all z-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={() => navigateImage('next')}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all z-10"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Close Button - Desktop */}
                <button
                  onClick={closeImageModal}
                  className="hidden md:flex absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Image */}
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="relative w-full h-full max-w-6xl max-h-full">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.caption}
                      fill
                      className="object-contain"
                      onError={handleImageError}
                    />
                  </div>
                </div>

                {/* Mobile Swipe Area - Invisible touch targets */}
                <div className="md:hidden absolute inset-0 flex">
                  <div
                    className="flex-1"
                    onClick={() => navigateImage('prev')}
                  />
                  <div
                    className="flex-1"
                    onClick={() => navigateImage('next')}
                  />
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="bg-black/80 text-white p-4 z-10">
                <div className="max-w-4xl mx-auto">
                  <p className="text-center font-medium mb-1">{selectedImage.caption}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                    <span className="inline-block px-2 py-1 bg-[#7EBDE6] text-[#294456] rounded-full text-xs">
                      {selectedImage.category.replace("-", " ")}
                    </span>
                    <span className="hidden md:inline">
                      {currentImageIndex + 1} of {getFilteredGallery().length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Dots */}
              <div className="md:hidden flex justify-center gap-2 p-4 bg-black/80">
                {getFilteredGallery().map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(getFilteredGallery()[index])
                      setCurrentImageIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}