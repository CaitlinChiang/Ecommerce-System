import { ReactElement } from 'react'
import { UserType } from '../../_enums/userType'
import layout from '../../layouts/unauth'
import SignInUser from '../../components/users/SignIn_SignUp'

const Page = (): ReactElement => {
  return (
    <>
      <SignInUser signUp={false} type={UserType.CUSTOMER} />
    </>
  )
}

export default layout(Page, {})
