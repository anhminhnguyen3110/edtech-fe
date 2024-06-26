import React from 'react'
import 'hint.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/main.css'
import NavBarMain from '@/components/navbar/navBarMain'

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <NavBarMain>{children}</NavBarMain>
    </div>
  )
}
