import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import ForgotPassword from '../../components/users/Passwords/forgotPassword'

const Page = (): ReactElement => {
  return (
    <>
      <ForgotPassword />
    </>
  )
}

export default layout(Page, { title: 'Forgot Password' })
