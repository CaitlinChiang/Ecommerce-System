import { useQuery } from '@apollo/client'
import { GetUser } from '../../layouts/query'
import { User } from '../../../types/user'
import { AdminPermission } from '../../_enums/adminPermission'

export const authenticateUser = (
  permission: AdminPermission,
  user: User
): boolean => {
  let currentUser: User = user

  if (!user) {
    const { data, loading } = useQuery(GetUser, { skip: user !== null })

    if (loading) return

    currentUser = data?.get_user
  }

  const adminPermission = Object(AdminPermission)[permission]

  if (!currentUser?.permissions?.includes(adminPermission)) return false

  return true
}
