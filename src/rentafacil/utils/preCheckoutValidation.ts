export const validatePreCheckout = ({
  documents,
  message,
  booking
}: any) => {

  if (!booking) return false

  if (!message || message.trim().length < 10) return false

  const allDocsUploaded = documents.length > 0 &&
    documents.every(doc => doc.file !== null)

  return allDocsUploaded
}