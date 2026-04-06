import { RequiredDocument } from "../interfaces/preCheckout"

export const requirements: RequiredDocument[] = [
  {
    id: "doc_1",
    name: "Cédula",
    required: true
  },
  {
    id: "doc_2",
    name: "Certificado laboral",
    required: true
  },
  {
    id: "doc_3",
    name: "Extractos bancarios",
    required: true
  },
  {
    id: "doc_4",
    name: "Referencias personales",
    required: false
  }
]