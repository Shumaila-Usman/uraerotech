'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuoteStatus } from '@prisma/client'

interface QuoteActionsProps {
  quoteId: string
  currentStatus: QuoteStatus
}

export function QuoteActions({ quoteId, currentStatus }: QuoteActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState('')

  const updateStatus = async (status: QuoteStatus) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes: notes }),
      })

      if (!response.ok) {
        throw new Error('Failed to update quote')
      }

      router.refresh()
    } catch (error) {
      console.error('Error updating quote:', error)
      alert('Failed to update quote. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-t border-white/10 pt-6">
      <div className="mb-4">
        <label htmlFor="adminNotes" className="block text-white/70 text-sm mb-2">
          Admin Notes
        </label>
        <textarea
          id="adminNotes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add notes about this quote..."
        />
      </div>

      <div className="flex gap-4">
        {currentStatus === 'PENDING' && (
          <>
            <button
              onClick={() => updateStatus('APPROVED')}
              disabled={isLoading}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg transition-colors text-green-400 font-semibold disabled:opacity-50"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus('REJECTED')}
              disabled={isLoading}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-colors text-red-400 font-semibold disabled:opacity-50"
            >
              Reject
            </button>
          </>
        )}
        {(currentStatus === 'APPROVED' || currentStatus === 'REJECTED') && (
          <button
            onClick={() => updateStatus('PENDING')}
            disabled={isLoading}
            className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg transition-colors text-yellow-400 font-semibold disabled:opacity-50"
          >
            Reset to Pending
          </button>
        )}
      </div>
    </div>
  )
}






