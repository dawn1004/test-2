import React, { FC } from 'react'

interface LayoutProps {
  children: JSX.Element | JSX.Element[] 
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <main
      className='relative min-h-screen w-full bg-white'
    >
      <div className='container mx-auto max-w-3xl border-l border-r min-h-screen md:py-8 py-6'>
        {children}
      </div>
    </main>
  )
}

export default Layout