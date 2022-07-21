import { ReactElement } from 'react'
import { UserType } from '../../_enums/userType'
import layout from '../../layouts/customer'
import ForgotPassword from '../../components/users/Passwords/forgotPassword'

const Page = (): ReactElement => {
  return (
    <>
      <ForgotPassword type={UserType.CUSTOMER} />
    </>
  )
}

export default layout(Page, { title: 'Forgot Password' })
