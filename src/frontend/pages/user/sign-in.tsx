import { ReactElement } from 'react'
import { UserType } from '../../_enums/userType'
import layout from '../../layouts/customer'
import SignInUser from '../../components/users/SignIn'

const Page = (): ReactElement => {
  return (
    <>
      <SignInUser type={UserType.CUSTOMER} />
    </>
  )
}

export default layout(Page, { title: 'Sign In' })
