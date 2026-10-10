import AboutUniversity from '@/components/modules/home/about-university'
import AcademicProgramsHighlight from '@/components/modules/home/academic-programs-highlight'
import AdmissionsHowToApply from '@/components/modules/home/admissions-how-to-apply'
import CampusLife from '@/components/modules/home/campus-life'
import ContactLocation from '@/components/modules/home/contact-location'
import FacultiesDepartmentsOverview from '@/components/modules/home/faculties-departments-overview'
import Hero from '@/components/modules/home/Hero'
import { events } from '@/components/modules/home/mock-events'
import { notices } from '@/components/modules/home/mock-notices'
import NewsBlogPreview from '@/components/modules/home/news-blog-preview'
import NoticeTicker from '@/components/modules/home/notice-ticker'
import QuickStats from '@/components/modules/home/quick-stats'
import Testimonials from '@/components/modules/home/testimonials'
import UpcomingEvents from '@/components/modules/home/upcoming-events'
import WhyChooseUs from '@/components/modules/home/why-choose-us'

import React from 'react'
import CampusFlowProjectDialog from '../../components/projects/CampusFlowProjectDialog'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <NoticeTicker notices={notices}
        autoPlay
        interval={5000}
      />
      <AboutUniversity />
      <QuickStats />
      <AcademicProgramsHighlight />
      <FacultiesDepartmentsOverview />
      <WhyChooseUs />
      <AdmissionsHowToApply />
      <CampusLife />
      <UpcomingEvents events={events} />
      <Testimonials />
      <NewsBlogPreview />
      <ContactLocation />
      <CampusFlowProjectDialog />
    </div>
  )
}



