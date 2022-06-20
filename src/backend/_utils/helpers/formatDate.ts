export const formatDate = (unformattedDate: Date): string => {
  if (!unformattedDate) return

  const dateString = unformattedDate.toLocaleString('en-US', { timeZone: 'UTC' })
  const splitDate = dateString.split(', ')

  const formattedDate = formatCurrentDate(splitDate[0])

  return formattedDate
}

const formatCurrentDate = (unformattedDate: string): string => {
  const splitDate = unformattedDate.split('/')

  const month = addZeroIfNeeded(splitDate[0])
  const day = addZeroIfNeeded(splitDate[1])
  const year = splitDate[2]

  return month + '-' + day + '-' + year
}

const addZeroIfNeeded = (number: string): string => {
  if (String(number).length === 1) {
    return '0' + number
  }
  return number
}
