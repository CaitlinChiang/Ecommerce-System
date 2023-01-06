import { formatCurrentDate } from './formatCurrentDate'

export const formatDateTime = (unformattedDate: Date, display?: boolean): string => {
  if (!unformattedDate && display === true) return '-'
  if (!unformattedDate && display === false) return

  const dateString = unformattedDate.toLocaleString('en-US', { timeZone: 'UTC' })
  const splitDate = dateString.split(', ')

  const formattedDate = formatCurrentDate(splitDate[0])
  const formattedTime = splitDate[1]

  return formattedDate + ', ' + formattedTime
}
