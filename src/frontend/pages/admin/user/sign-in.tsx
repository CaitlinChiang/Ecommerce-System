import { ReactElement } from 'react'
import { UserType } from '../../../_enums/userType'
import layout from '../../../layouts/unauth'
import SignInUser from '../../../components/users/SignIn'

const Page = (): ReactElement => {
  return (
    <>
      <SignInUser type={UserType.ADMINISTRATOR} />
    </>
  )
}

export default layout(Page, { title: 'Sign In' })
