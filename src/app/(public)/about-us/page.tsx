import { AboutApproach } from '@/components/modules/aboutus/about-approach'
import { AboutCTA } from '@/components/modules/aboutus/about-cta'
import { AboutHero } from '@/components/modules/aboutus/about-hero'
import { AboutIntro } from '@/components/modules/aboutus/about-intro'
import { AboutProblems } from '@/components/modules/aboutus/about-problems'
import { AboutUsers } from '@/components/modules/aboutus/about-users'
import { AboutValues } from '@/components/modules/aboutus/about-values'
import React from 'react'

export default function AboutUsPage() {
  return (
    <div>
      <AboutHero />
      <AboutIntro />
      <AboutProblems />
      <AboutApproach />
      <AboutUsers />
      <AboutValues />
      <AboutCTA />



    </div>
  )
}
