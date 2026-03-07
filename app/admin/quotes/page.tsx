import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { fileDb } from '@/lib/file-db'
import { formatDate } from '@/utils/format'
import Link from 'next/link'

export default async function AdminQuotesPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const allQuotes = fileDb.findMany<any>('Quote')
  const allUsers = fileDb.findMany<any>('User')
  
  const quotes = allQuotes
    .map((quote: any) => {
      const user = quote.userId ? allUsers.find((u: any) => u.id === quote.userId) : null
      return { ...quote, user }
    })
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Manage Quotes</h1>
            <Link
              href="/admin"
              className="text-blue-400 hover:text-blue-300 text-sm sm:text-base"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
            {quotes.length === 0 ? (
              <p className="text-white/70 text-sm sm:text-base">No quotes found.</p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {quotes.map((quote: typeof quotes[0]) => (
                  <div
                    key={quote.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-3 sm:mb-4 gap-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-base sm:text-lg mb-1">{quote.name}</h3>
                        <p className="text-white/70 text-xs sm:text-sm">{quote.email}</p>
                        {quote.company && (
                          <p className="text-white/70 text-xs sm:text-sm">Company: {quote.company}</p>
                        )}
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                        quote.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                        quote.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                    <div className="mb-3 sm:mb-4">
                      <p className="text-white/70 text-xs sm:text-sm mb-2">
                        <strong>Service Type:</strong> {quote.serviceType}
                      </p>
                      <p className="text-white/70 text-xs sm:text-sm">{quote.message}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <p className="text-white/50 text-xs sm:text-sm">{formatDate(quote.createdAt)}</p>
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-aviation rounded-lg hover:shadow-glow-blue transition-all text-white font-semibold text-xs sm:text-sm"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

