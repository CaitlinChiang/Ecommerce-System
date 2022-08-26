import Cookies from 'js-cookie'
import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetUser } from '../View/query'
import { User } from '../../../../types/user'
import { AdminPermission } from '../../../_enums/adminPermission'
import { UserType } from '../../../_enums/userType'
import NoPermissions from '../../_common/NoPermissions'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const AuthorizedPath = ({
  children,
  permission
}: {
  children: ReactElement | ReactElement[]
  permission?: AdminPermission
}): ReactElement => {
  const { data } = useQuery(GetUser)
  const user: User = data?.get_user || {}

  const accesstoken = Cookies.get('accessToken')

  const noAccessToken = typeof window !== 'undefined' && !accesstoken
  const customer = user?.type === UserType.CUSTOMER

  if (noAccessToken || customer) {
    window.location.replace('/admin/user/sign-in')
  }

  if (permission && !authenticateUser(permission)) return <NoPermissions />

  return <>{children}</>
}

export default AuthorizedPath
