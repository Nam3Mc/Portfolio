import Image from "next/image"

interface Props {
  images: string[]
}

export default function PropertyGallery({ images }: Props) {

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px]">

      <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
        <Image
          src={images[0]}
          alt="property"
          fill
          className="object-cover"
        />
      </div>

      {images.slice(1,5).map((img, i) => (

        <div
          key={i}
          className="relative rounded-xl overflow-hidden"
        >
          <Image
            src={img}
            alt="property"
            fill
            className="object-cover"
          />
        </div>

      ))}

    </div>
  )
}