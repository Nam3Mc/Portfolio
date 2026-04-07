export type DocumentType = "pdf" | "image" | "any"

export interface RequiredDocument {
  id: string
  name: string
  description?: string
  required: boolean
  type: DocumentType
}