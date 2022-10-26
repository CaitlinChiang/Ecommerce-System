import { formatText } from './formatText'

export const formatWindowLocation = (location: string): string => {
  const locationString = location.split('-')
  let formattedLocationString = ''

  locationString.map((e: string): void => {
    formattedLocationString += ' ' + formatText(e)
  })

  return formattedLocationString
}
