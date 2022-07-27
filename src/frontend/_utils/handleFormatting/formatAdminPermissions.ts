import { AdminPermission } from '../../_enums/adminPermission'

export const returnAdminPermissions = (): { [key: string]: string[] } => {
  const adminPermissions: { [key: string]: string[] } = {}

  Object.keys(AdminPermission).map((permission: string) => {
    const category = permission.substring(permission.indexOf('_') + 1)

    if (!adminPermissions[category]) {
      adminPermissions[category] = [permission]
    } else {
      adminPermissions[category].push(permission)
    }
  })

  return adminPermissions
}

export const formatPermissionCategory = (permission: string): string => {
  return permission.replaceAll('_', ' ')
}
