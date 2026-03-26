"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { PaginationProps } from "@/src/rentafacil/interfaces/PaginationProps"

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {

  const generatePages = () => {
    const pages: (number | "...")[] = []

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  const pages = generatePages()

  return (
    <div className="flex items-center justify-center mt-12 gap-2 flex-wrap">

      {/* PREV */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
        flex items-center gap-1 px-3 py-2 rounded-xl border text-sm
        disabled:opacity-40 disabled:cursor-not-allowed
        hover:bg-gray-100 transition
        "
      >
        <ChevronLeft size={16} />
      </button>

      {/* PAGES */}
      {pages.map((page, index) => {

        if (page === "...") {
          return (
            <span key={index} className="px-2 text-gray-400 text-sm">
              ...
            </span>
          )
        }

        const isActive = page === currentPage

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
            min-w-[36px] h-9 flex items-center justify-center
            rounded-xl text-sm font-medium transition-all
            ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                : "bg-white border hover:bg-gray-100"
            }
            `}
          >
            {page}
          </button>
        )
      })}

      {/* NEXT */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
        flex items-center gap-1 px-3 py-2 rounded-xl border text-sm
        disabled:opacity-40 disabled:cursor-not-allowed
        hover:bg-gray-100 transition
        "
      >
        <ChevronRight size={16} />
      </button>

    </div>
  )
}