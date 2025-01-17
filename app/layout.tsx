import './globals.css'

import ThemeProvider from './components/ThemeProvider'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  suppressHydrationWarning={true} className="">
        <ThemeProvider> 
          <Navbar />         
          {children}
          <Footer />          
        </ThemeProvider>
      </body>
    </html>
  )
}
