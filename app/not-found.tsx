import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
          <p className="text-white/70 mb-8 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-aviation rounded-xl hover:shadow-glow-blue transition-all text-white font-semibold"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}






