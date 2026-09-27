import CampusLocation from '@/components/modules/contact/CampusLocation'
import ContactCTA from '@/components/modules/contact/ContactCTA'
import ContactFAQ from '@/components/modules/contact/ContactFAQ'
import ContactForm from '@/components/modules/contact/ContactForm'
import ContactHero from '@/components/modules/contact/ContactHero'
import ContactInfo from '@/components/modules/contact/ContactInfo'
import UniversityOffices from '@/components/modules/contact/UniversityOffices'
import React from 'react'

export default function ContactPage() {
  return (
    <div>
      <ContactHero/>
      <ContactInfo/>
      <UniversityOffices/>
      <ContactForm/>
      <CampusLocation/>
      <ContactFAQ/>
      <ContactCTA/>

    </div>
  )
}
