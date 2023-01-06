import { formatCurrentDate } from './formatCurrentDate'

export const formatDate = (unformattedDate: Date, display?: boolean): string => {
  if (!unformattedDate && display === true) return '-'
  if (!unformattedDate && display === false) return

  const dateString = unformattedDate.toLocaleString('en-US', { timeZone: 'UTC' })
  const splitDate = dateString.split(', ')

  return formatCurrentDate(splitDate[0])
}
