export const formatCurrentDate = (unformattedDate: string): string => {
  const splitDate = unformattedDate.split('/')

  const month = addZeroIfNeeded(splitDate[0])
  const day = addZeroIfNeeded(splitDate[1])
  const year = splitDate[2]

  return month + '-' + day + '-' + year
}

export const addZeroIfNeeded = (number: string): string => {
  if (String(number).length === 1) {
    return '0' + number
  }
  return number
}
