interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {

  if (!images || images.length < 5) {
    return <div>Loading images...</div>
  }

  return (

    <div className="w-full mt-6">

      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[420px]">

        {/* IMAGE 1 - MAIN */}

        <img
          src={images[0]}
          alt="property"
          className="col-span-2 row-span-2 w-full h-full object-cover rounded-xl"
        />

        {/* IMAGE 2 */}

        <img
          src={images[1]}
          alt="property"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* IMAGE 3 */}

        <img
          src={images[2]}
          alt="property"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* IMAGE 4 */}

        <img
          src={images[3]}
          alt="property"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* IMAGE 5 */}

        <img
          src={images[4]}
          alt="property"
          className="w-full h-full object-cover rounded-xl"
        />

      </div>

    </div>

  )

}