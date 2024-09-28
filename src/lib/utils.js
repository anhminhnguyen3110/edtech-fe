export const formatStartTime = (utcDate) => {
  const localDate = new Date(utcDate) // Parse as UTC
  const sydneyTimeZone = 'Australia/Sydney'
  return localDate.toLocaleString(undefined, {
    timeZone: sydneyTimeZone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}
