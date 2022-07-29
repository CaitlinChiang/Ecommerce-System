import { useQuery } from '@apollo/client'
import { GetUser } from '../../layouts/query'
import { User } from '../../../types/user'
import { AdminPermission } from '../../_enums/adminPermission'

export const authenticateUser = (permission: AdminPermission): boolean => {
  const { data, loading } = useQuery(GetUser)

  if (loading) return

  const user: User = data?.get_user || {}

  if (!user?.permissions?.includes(Object(AdminPermission)[permission])) return false

  return true
}
