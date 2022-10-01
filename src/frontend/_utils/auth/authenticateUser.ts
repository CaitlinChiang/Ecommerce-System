import { useQuery } from '@apollo/client'
import { GetUser } from '../../layouts/query'
import { User } from '../../../types/user'
import { AdminPermission } from '../../_enums/adminPermission'

export const authenticateUser = (permission: AdminPermission): boolean => {
  const { data, loading } = useQuery(GetUser)

  if (loading) return

  const user: User = data?.get_user
  return checkAdminPermission(permission, user)
}

export const checkAdminPermission = (
  permission: AdminPermission,
  user: User
): boolean => {
  const adminPermission = Object(AdminPermission)[permission]

  if (!user?.permissions?.includes(adminPermission)) return false
  return true
}
