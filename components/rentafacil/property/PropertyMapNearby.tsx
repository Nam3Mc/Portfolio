"use client"

import { useEffect, useState, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Place {
  id: string
  name: string
  lat: number
  lng: number
  type: string
}

interface Props {
  lat: number
  lng: number
  address?: string
  radius?: number
}

export default function PropertyMap({ lat, lng, address, radius = 500 }: Props) {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)

  // Memoize icons so they are not recreated on every render
  const propertyIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "/marker-icon.png",
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        popupAnchor: [0, -45],
      }),
    []
  )

  const placeIcons = useMemo(() => ({
    restaurant: L.icon({ iconUrl: "/restaurant-icon.png", iconSize: [30, 45], iconAnchor: [15, 45] }),
    supermarket: L.icon({ iconUrl: "/supermarket-icon.png", iconSize: [30, 45], iconAnchor: [15, 45] }),
    hospital: L.icon({ iconUrl: "/hospital-icon.png", iconSize: [30, 45], iconAnchor: [15, 45] }),
    unknown: propertyIcon
  }), [propertyIcon])

  useEffect(() => {
    if (!lat || !lng) return
    setLoading(true)

    const fetchNearby = async () => {
      const query = `
        [out:json];
        (
          node["amenity"="restaurant"](around:${radius},${lat},${lng});
          node["shop"="supermarket"](around:${radius},${lat},${lng});
          node["amenity"="hospital"](around:${radius},${lat},${lng});
        );
        out body;
      `
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
      try {
        const res = await fetch(url)
        const data: { elements: any[] } = await res.json()
        const mapped: Place[] = data.elements.map((el) => ({
          id: String(el.id),
          name: el.tags?.name || el.tags?.amenity || el.tags?.shop || "Unknown",
          lat: el.lat,
          lng: el.lon,
          type: el.tags?.amenity || el.tags?.shop || "unknown"
        }))
        setPlaces(mapped)
      } catch (err) {
        console.error("Error fetching nearby places:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNearby()
  }, [lat, lng, radius])

  if (!lat || !lng) return null

  return (
    <div className="w-full h-96 rounded-lg border overflow-hidden relative">
      
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-20">
          <span className="text-white font-medium">Cargando lugares cercanos...</span>
        </div>
      )}

      <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={[lat, lng]} icon={propertyIcon}>
          {address && <Popup>{address}</Popup>}
        </Marker>

        {places.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={placeIcons[p.type] || placeIcons.unknown}
          >
            <Popup>{p.name} ({p.type})</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}