import { Review } from "@/src/rentafacil/interfaces/Review"

interface PropertyReviewsProps {
  reviews?: Review[]
}

export default function PropertyReviews({ reviews }: PropertyReviewsProps) {

  if (!reviews?.length) return null

  return (

    <div className="flex flex-col gap-4">

      <h3 className="text-lg font-semibold">
        Guest Reviews
      </h3>

      <div className="flex gap-6 overflow-x-auto pb-4">

        {reviews.map((review, index) => (

          <div
            key={index}
            className="min-w-[260px] border rounded-xl p-4 flex flex-col gap-2"
          >

            <span className="font-semibold">
              {review.user}
            </span>

            <span className="text-yellow-500">
              {"⭐".repeat(review.rating)}
            </span>

            <p className="text-sm text-gray-600">
              {review.comment}
            </p>

          </div>

        ))}

      </div>

    </div>

  )

}