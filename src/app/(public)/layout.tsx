import FooterPublic from '@/components/layout/public/Footer'
import HeaderPublic from '@/components/layout/public/Header'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <HeaderPublic />
            <main className='flex-1'>{children}</main>
            <FooterPublic />
        </div>
    )
}
