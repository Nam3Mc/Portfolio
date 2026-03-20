export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"

export interface Reservation {
  id: string

  propertyId: string
  userId: string

  checkIn: Date
  checkOut: Date

  guests: number

  totalPrice: number

  status: ReservationStatus

  createdAt: Date
}