import { ReactElement } from 'react'
import { UserType } from '../../../_enums/userType'
import layout from '../../../layouts/customer'
import ResetPassword from '../../../components/users/Passwords/resetPassword/fromProfile'

const Page = (): ReactElement => {
  return (
    <>
      <ResetPassword type={UserType.CUSTOMER} />
    </>
  )
}

export default layout(Page, { title: 'Reset Password' })
