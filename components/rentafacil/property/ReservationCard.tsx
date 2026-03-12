interface ReservationCardProps {
  pricePerNight: number
}

export default function ReservationCard({ pricePerNight }: ReservationCardProps) {

  return (

    <div className="sticky top-24 border rounded-xl p-6 shadow-lg flex flex-col gap-4">

      <div className="text-2xl font-bold text-indigo-600">

        ${pricePerNight}

        <span className="text-sm text-gray-500 ml-1">
          /night
        </span>

      </div>

      <button className="bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
        Reserve
      </button>

      <span className="text-xs text-gray-500 text-center">
        You won't be charged yet
      </span>

    </div>

  )

}