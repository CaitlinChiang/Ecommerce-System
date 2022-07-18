import { ReactElement } from 'react'
import layout from '../../../../layouts/customer'
import ResetPassword from '../../../../components/users/Passwords/resetPassword/fromEmail'

const Page = (): ReactElement => {
  return (
    <>
      <ResetPassword />
    </>
  )
}

export default layout(Page, { title: 'Reset Password' })
