import React from 'react'
import NavBarMain from '@/components/navbar/navBarMain'
import Footer from '@components/footer/footer'
export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <NavBarMain>{children}</NavBarMain>
      <Footer />
    </div>
  )
}
