import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { fileDb } from '@/lib/file-db'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import { QuoteActions } from '@/components/QuoteActions'

export default async function QuoteDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const quote = fileDb.findUnique<any>('Quote', { id: params.id })
  const allUsers = fileDb.findMany<any>('User')

  if (!quote) {
    notFound()
  }

  const user = quote.userId ? allUsers.find((u: any) => u.id === quote.userId) : null
  const quoteWithUser = { ...quote, user }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/admin/quotes"
            className="text-blue-400 hover:text-blue-300 mb-4 sm:mb-6 inline-block text-sm sm:text-base"
          >
            ← Back to Quotes
          </Link>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Quote Request</h1>
              <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold ${
                quoteWithUser.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                quoteWithUser.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {quoteWithUser.status}
              </span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-white/70 text-xs sm:text-sm mb-2">Contact Information</h2>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 space-y-2">
                  <p className="text-white text-sm sm:text-base"><strong>Name:</strong> {quoteWithUser.name}</p>
                  <p className="text-white text-sm sm:text-base"><strong>Email:</strong> {quoteWithUser.email}</p>
                  {quoteWithUser.phone && (
                    <p className="text-white text-sm sm:text-base"><strong>Phone:</strong> {quoteWithUser.phone}</p>
                  )}
                  {quoteWithUser.company && (
                    <p className="text-white text-sm sm:text-base"><strong>Company:</strong> {quoteWithUser.company}</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-white/70 text-xs sm:text-sm mb-2">Request Details</h2>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 space-y-2">
                  <p className="text-white text-sm sm:text-base"><strong>Service Type:</strong> {quoteWithUser.serviceType}</p>
                  {quoteWithUser.itemId && (
                    <p className="text-white text-sm sm:text-base"><strong>Item ID:</strong> {quoteWithUser.itemId}</p>
                  )}
                  <p className="text-white text-sm sm:text-base"><strong>Message:</strong></p>
                  <p className="text-white/70 whitespace-pre-wrap text-sm sm:text-base">{quoteWithUser.message}</p>
                </div>
              </div>

              {quoteWithUser.adminNotes && (
                <div>
                  <h2 className="text-white/70 text-xs sm:text-sm mb-2">Admin Notes</h2>
                  <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                    <p className="text-white/70 whitespace-pre-wrap text-sm sm:text-base">{quoteWithUser.adminNotes}</p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-white/50 text-xs sm:text-sm">Submitted: {formatDate(quoteWithUser.createdAt)}</p>
                {quoteWithUser.updatedAt !== quoteWithUser.createdAt && (
                  <p className="text-white/50 text-xs sm:text-sm">Last Updated: {formatDate(quoteWithUser.updatedAt)}</p>
                )}
              </div>

              <QuoteActions quoteId={quoteWithUser.id} currentStatus={quoteWithUser.status} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

