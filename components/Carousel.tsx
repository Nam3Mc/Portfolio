"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const images = [
    '/rentafacilHome.png',
    '/repollas.png',
    '/rentafacilHome.png',
    '/repollas.png',
    '/rentafacilHome.png',
    '/repollas.png'
]

export default function Carousel() {
    const [emblaRef] = useEmblaCarousel(
        {loop: true},
        [Autoplay({ delay: 15000})]
    )
    
    return (
        <div className="overflow-hidden w-full max-w-4xl mx-auto" ref={emblaRef}>
        <div className="flex">
            {images.map( (src, index) => (
                <div className="min-w-[33.3333%] relative h-[200px] px-2" key={index}>
                    <Image
                        src={src}
                        alt={`Slide ${index}`}
                        fill
                        className="object-cover"
                        />
                </div>
            ))}
        </div>
    </div>
    )
}