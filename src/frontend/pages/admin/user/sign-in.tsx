import { ReactElement } from 'react'
import layout from '../../../layouts'
import SignInUser from '../../../components/users/SignIn'

const Page = (): ReactElement => {
  return (
    <>
      <SignInUser />
    </>
  )
}

export default layout(Page, { title: 'Sign In' })
