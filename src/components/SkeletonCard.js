'use client'

export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 animate-pulse">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer w-3/4"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer w-2/3"></div>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer w-1/3"></div>
    </div>
  )
}
