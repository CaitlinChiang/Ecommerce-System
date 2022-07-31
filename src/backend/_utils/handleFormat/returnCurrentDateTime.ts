import { formatDateZeroes } from './formatDateZeroes'

export const currentDateTime = (): Date => {
  const date = new Date()
  const localDate = date.toLocaleString('en-US', { timeZone: 'Asia/Manila' })

  const formattedDate = formatCurrentDate(localDate)
  const formattedTime = formatCurrentTime(localDate)

  return new Date(formattedDate + formattedTime)
}

const formatCurrentDate = (localDate: string): string => {
  const currentDate = localDate.split(', ')[0]
  const splitDate = currentDate.split('/')

  const month = formatDateZeroes(splitDate[0])
  const day = formatDateZeroes(splitDate[1])
  const year = formatDateZeroes(splitDate[2])

  return year + '-' + month + '-' + day
}

const formatCurrentTime = (localDate: string): string => {
  const currentTime = localDate.split(', ')[1].split(' ')[0]
  const currentTimeOfDay = localDate.split(', ')[1].split(' ')[1]
  const splitTime = currentTime.split(':')

  const hour = transformTo24HourTime(splitTime[0], currentTimeOfDay)
  const minute = formatDateZeroes(splitTime[1])
  const second = formatDateZeroes(splitTime[2])

  const time = hour + ':' + minute + ':' + second

  return 'T' + time + '.000+00:00'
}

const transformTo24HourTime = (hour: string, currentTimeOfDay: string): string => {
  switch (currentTimeOfDay) {
    case 'AM':
      return formatDateZeroes(hour)
    case 'PM':
      return String(12 + Number(hour))
  }
}
