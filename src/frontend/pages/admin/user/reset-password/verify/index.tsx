import { ReactElement } from 'react'
import { UserType } from '../../../../../_enums/userType'
import layout from '../../../../../layouts/unauth'
import ResetPassword from '../../../../../components/users/Passwords/resetPassword/fromEmail'

const Page = (): ReactElement => {
  return (
    <>
      <ResetPassword type={UserType.ADMINISTRATOR} />
    </>
  )
}

export default layout(Page, { title: 'Reset Password' })
