import { formatCurrentDate } from './formatCurrentDate'

export const formatDate = (unformattedDate: Date): string => {
  if (!unformattedDate) return

  const dateString = unformattedDate.toLocaleString('en-US', { timeZone: 'UTC' })
  const splitDate = dateString.split(', ')

  const formattedDate = formatCurrentDate(splitDate[0])

  return formattedDate
}
