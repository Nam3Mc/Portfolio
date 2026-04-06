export interface RequiredDocument {
  id: string
  name: string
  required: boolean
}

export interface UploadedDocument {
  documentId: string
  file: File | null
}

export interface BookingSummaryData {
  propertyName: string
  location: string
  image: string
  checkIn: string
  checkOut: string
  pricePerNight: number
  nights: number
}
export interface PreBookingRequest {
  propertyId: string
  userId: string

  checkIn: string
  checkOut: string
  nights: number
  totalPrice: number

  documents: {
    documentId: string
    fileUrl: string
  }[]

  message: string

  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED"
}