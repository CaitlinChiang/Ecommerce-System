import { WebsiteText } from '../../../types/websiteText'

export const formatContactInformation = (
  medium: string,
  websiteText: WebsiteText
): string => {
  const websiteTextSplit = websiteText?.content?.split(', ')

  const val = websiteTextSplit?.find((text: string) => text.includes(medium))

  const formattedVal = val?.substring(val.indexOf('[') + 1, val.indexOf(']'))
  return formattedVal
}
