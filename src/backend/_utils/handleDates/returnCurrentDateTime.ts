import { addZeroIfNeeded } from './formatCurrentDate'

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

  const month = addZeroIfNeeded(splitDate[0])
  const day = addZeroIfNeeded(splitDate[1])
  const year = addZeroIfNeeded(splitDate[2])

  return year + '-' + month + '-' + day
}

const formatCurrentTime = (localDate: string): string => {
  const currentTime = localDate.split(', ')[1].split(' ')[0]
  const currentTimeOfDay = localDate.split(', ')[1].split(' ')[1]
  const splitTime = currentTime.split(':')

  const hour = transformTo24HourTime(splitTime[0], currentTimeOfDay)
  const minute = addZeroIfNeeded(splitTime[1])
  const second = addZeroIfNeeded(splitTime[2])

  const time = hour + ':' + minute + ':' + second

  return 'T' + time + '.000+00:00'
}

const transformTo24HourTime = (hour: string, currentTimeOfDay: string): string => {
  switch (currentTimeOfDay) {
    case 'AM':
      return addZeroIfNeeded(hour)
    case 'PM':
      return String(12 + Number(hour))
  }
}
