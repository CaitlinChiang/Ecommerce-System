import { WebsiteText } from '../../../types/websiteText'

export const displayContactInfo = (
  medium: string,
  websiteText: WebsiteText
): string | null => {
  const websiteTextSplit = websiteText?.content?.split(', ')

  const val = websiteTextSplit?.find((text: string) => text.includes(medium))

  if (!val) return null

  const formattedVal = val?.substring(val.indexOf('[') + 1, val.indexOf(']'))
  return formattedVal
}

export const formatContactInfo = (args: any): string | null => {
  if (args?.email?.trim().length === 0 || args?.phoneNumber?.trim().length === 0) {
    return null
  }

  let contentString = `Email-[${args.email}], PhoneNumber-[${args.phoneNumber}]`

  if (args?.facebook?.trim().length > 0) {
    contentString += `, Facebook-[${args.facebook}]`
  }

  if (args?.instagram?.trim().length > 0) {
    contentString += `, Instagram-[${args.instagram}]`
  }

  return contentString
}
