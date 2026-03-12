"use client"

import { PaginationProps } from "@/src/rentafacil/interfaces/PaginationProps"

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center mt-10 gap-2">

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
          px-4
          py-2
          rounded-lg
          text-sm
          font-medium
          transition
          ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }
          `}
        >
          {page}
        </button>
      ))}

    </div>
  )
}