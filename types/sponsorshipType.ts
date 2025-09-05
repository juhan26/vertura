// types/sponsorship.ts

import { StaticImageData } from "next/image"

export interface SponsorshipStory {
    brief: string
    details: string
    impact: string
    highlight: string
  }
  
  export interface SponsorshipEvent {
    id: number
    title: string
    date: string
    location: string
    category: string
    imageSrc: StaticImageData
    story: SponsorshipStory
    participants: number
    mediaReach: string
    featured: boolean
  }
  
  export type FilterCategory = "all" | "Skate" | "Boxing"