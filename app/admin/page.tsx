import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { fileDb } from '@/lib/file-db'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const allProducts = fileDb.findMany<any>('Product')
  const allOrders = fileDb.findMany<any>('Order')
  const allQuotes = fileDb.findMany<any>('Quote')
  const allUsers = fileDb.findMany<any>('User')

  const productsCount = allProducts.length
  const ordersCount = allOrders.length
  const quotesCount = allQuotes.filter((q: any) => q.status === 'PENDING').length
  const usersCount = allUsers.length

  const recentOrders = allOrders
    .map((order: any) => {
      const user = allUsers.find((u: any) => u.id === order.userId)
      return { ...order, user }
    })
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const pendingQuotes = allQuotes
    .filter((q: any) => q.status === 'PENDING')
    .map((quote: any) => {
      const user = quote.userId ? allUsers.find((u: any) => u.id === quote.userId) : null
      return { ...quote, user }
    })
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const totalRevenue = allOrders
    .filter((o: any) => ['DELIVERED', 'SHIPPED'].includes(o.status))
    .reduce((sum: number, order: any) => sum + (order.total || 0), 0)

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Admin Dashboard</h1>
            <Link
              href="/admin/products/new"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-aviation rounded-lg hover:shadow-glow-blue transition-all text-white font-semibold text-sm sm:text-base"
            >
              Add Product
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
              <p className="text-white/70 text-xs sm:text-sm mb-2">Total Products</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{productsCount}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
              <p className="text-white/70 text-xs sm:text-sm mb-2">Total Orders</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{ordersCount}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
              <p className="text-white/70 text-xs sm:text-sm mb-2">Pending Quotes</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{quotesCount}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
              <p className="text-white/70 text-xs sm:text-sm mb-2">Total Revenue</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {formatCurrency(totalRevenue || 0)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Recent Orders */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Orders</h2>
                <Link href="/admin/orders" className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm">
                  View All
                </Link>
              </div>
              {recentOrders.length === 0 ? (
                <p className="text-white/70">No orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border-b border-white/10 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-white font-semibold">Order #{order.id.slice(0, 8)}</span>
                          <p className="text-white/70 text-sm">{order.user.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.status === 'DELIVERED' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-white font-semibold">{formatCurrency(order.total)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Quotes */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Pending Quotes</h2>
                <Link href="/admin/quotes" className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm">
                  View All
                </Link>
              </div>
              {pendingQuotes.length === 0 ? (
                <p className="text-white/70">No pending quotes.</p>
              ) : (
                <div className="space-y-4">
                  {pendingQuotes.map((quote) => (
                    <div key={quote.id} className="border-b border-white/10 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-white font-semibold">{quote.name}</span>
                          <p className="text-white/70 text-sm">{quote.email}</p>
                        </div>
                        <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">
                          {quote.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">{quote.message}</p>
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                      >
                        Review →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 sm:mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <Link
                href="/admin/products"
                className="p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
              >
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Manage Products</h3>
                <p className="text-white/70 text-xs sm:text-sm">Add, edit, or remove products</p>
              </Link>
              <Link
                href="/admin/quotes"
                className="p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
              >
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Manage Quotes</h3>
                <p className="text-white/70 text-xs sm:text-sm">Review and respond to quote requests</p>
              </Link>
              <Link
                href="/admin/orders"
                className="p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
              >
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Manage Orders</h3>
                <p className="text-white/70 text-xs sm:text-sm">View and update order status</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

