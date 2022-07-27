import { useQuery } from '@apollo/client'
import { GetUser } from '../../layouts/query'
import { User } from '../../../types/user'
import { AdminPermission } from '../../_enums/adminPermission'

export const authenticateUser = (permission: AdminPermission): boolean => {
  const { data } = useQuery(GetUser)

  const user: User = data?.get_user || {}

  if (!user?.permissions?.includes(Object(AdminPermission)[permission])) return false
  return true
}
