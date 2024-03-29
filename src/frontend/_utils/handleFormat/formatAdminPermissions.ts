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
  let formatCategory = permission.replaceAll('_', ' ')

  const lastLetter = formatCategory.slice(-1)

  if (lastLetter === 'Y') {
    const removeLastLetter = formatCategory.slice(0, -1)
    formatCategory = removeLastLetter + 'IES'
  }

  if (lastLetter !== 'Y' && lastLetter !== 'S') {
    formatCategory += 'S'
  }

  return formatCategory
}

export const allCategoryPermissions = (
  category: string,
  permissions: string[]
): boolean => {
  const adminPermissions: string[] = generatePermissions(category)

  const allPermissions = adminPermissions.every((e) => {
    return permissions.includes(e)
  })

  return allPermissions
}

export const checkAll = (category: string, permissions: string[]): string[] => {
  const adminPermissions: string[] = []

  Object.keys(AdminPermission).map((permission: string) => {
    if (
      permission.includes(category) &&
      !permission.includes(category + '_') &&
      !permissions.includes(permission) &&
      Object(AdminPermission)[permission].length > 0
    ) {
      adminPermissions.push(permission)
    }
  })

  return permissions.concat(adminPermissions)
}

export const uncheckAll = (category: string, permissions: string[]): string[] => {
  const adminPermissions: string[] = generatePermissions(category)

  return permissions.filter((e) => !adminPermissions.includes(e))
}

export const generatePermissions = (category: string): string[] => {
  const adminPermissions: string[] = []

  Object.keys(AdminPermission).map((permission: string) => {
    if (
      permission.includes(category) &&
      !permission.includes(category + '_') &&
      Object(AdminPermission)[permission].length > 0
    ) {
      adminPermissions.push(permission)
    }
  })

  return adminPermissions
}
