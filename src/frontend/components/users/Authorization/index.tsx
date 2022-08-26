import Cookies from 'js-cookie'
import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetUser } from '../View/query'
import { User } from '../../../../types/user'
import { UserType } from '../../../_enums/userType'

const AuthorizedPath = ({
  children
}: {
  children: ReactElement | ReactElement[]
}): ReactElement => {
  const { data } = useQuery(GetUser)
  const user: User = data?.get_user || {}

  const accesstoken = Cookies.get('accessToken')

  const noAccessToken = typeof window !== 'undefined' && !accesstoken
  const customer = user?.type === UserType.CUSTOMER

  if (noAccessToken || customer) {
    window.location.replace('/admin/user/sign-in')
  }

  return <>{children}</>
}

export default AuthorizedPath
