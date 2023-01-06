import { formatDateZeroes } from './formatDateZeroes'

export const formatCurrentDate = (unformattedDate: string): string => {
  const splitDate = unformattedDate.split('/')

  const month = formatDateZeroes(splitDate[0])
  const day = formatDateZeroes(splitDate[1])
  const year = splitDate[2]

  return month + '-' + day + '-' + year
}
