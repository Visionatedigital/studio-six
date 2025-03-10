import './globals.css'
import { Inter, Poppins, Lato, Cabin, Roboto } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})
const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato'
})
const cabin = Cabin({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cabin'
})
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: 'StudioSix - AI Architectural Visualization',
  description: 'Transform your sketches into stunning architectural renders with AI',
  icons: '/favicon.ico'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${lato.variable} ${cabin.variable} ${roboto.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className="bg-[#F6F8FA] min-h-screen overflow-x-auto">
        {children}
      </body>
    </html>
  )
}
