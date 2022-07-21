import { UserType } from '../../_enums/userType'

export const generateAdminUrl = (type: UserType): string => {
  if (type === UserType.ADMINISTRATOR) {
    return '/admin'
  }
  return ''
}
