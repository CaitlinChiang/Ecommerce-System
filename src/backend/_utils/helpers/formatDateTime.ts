const months = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
}

export const formatDateTime = (unformattedDate: Date): string => {
  if (!unformattedDate) return

  const formattedDate = formatCurrentDate(unformattedDate)
  const formattedTime = formatCurrentTime(unformattedDate)

  return formattedDate + ', ' + formattedTime
}

const formatCurrentDate = (unformattedDate: Date): string => {
  const currentDate = String(unformattedDate).substring(4, 15)
  const splitDate = currentDate.split(' ')

  const month = months[splitDate[0]]
  const day = splitDate[1]
  const year = splitDate[2].substring(2, 4)

  return month + '-' + day + '-' + year
}

const formatCurrentTime = (unformattedDate: Date): string => {
  const currentTime = String(unformattedDate).substring(16, 24)
  const splitTime = currentTime.split(':')
  const currentTimeOfDay = checkTimeOfDay(splitTime[0])

  const hour = transformTo12HourTime(splitTime[0])
  const minute = splitTime[1]
  const second = splitTime[2]

  const time = hour + ':' + minute + ':' + second

  return time + ' ' + currentTimeOfDay
}

const checkTimeOfDay = (hour: string): string => {
  const PhilippineHour = Number(hour) + 4

  if (PhilippineHour > 12) {
    return 'PM'
  }
  return 'AM'
}

const transformTo12HourTime = (hour: string): string => {
  const PhilippineHour = Number(hour) + 4

  if (PhilippineHour > 12) {
    return String(Number(hour) - 8)
  }
  return hour
}
