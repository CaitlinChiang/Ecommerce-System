export const formatDateRange = (unformattedDate: Date, startDate: boolean): Date => {
  const dateString = unformattedDate.toLocaleString('en-US', { timeZone: 'UTC' })

  const date = dateString.substring(0, 10)
  const time = startDate ? 'T00:00:00.000Z' : 'T23:59:59.000Z'

  return new Date(date + time)
}
