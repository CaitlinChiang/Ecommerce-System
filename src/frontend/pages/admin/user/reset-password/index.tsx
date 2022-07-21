import { ReactElement } from 'react'
import { UserType } from '../../../../_enums/userType'
import layout from '../../../../layouts/admin'
import ResetPassword from '../../../../components/users/Passwords/resetPassword/fromProfile'

const Page = (): ReactElement => {
  return (
    <>
      <ResetPassword type={UserType.ADMINISTRATOR} />
    </>
  )
}

export default layout(Page, { title: 'Reset Password' })
