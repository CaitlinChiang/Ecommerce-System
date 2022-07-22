import { ReactElement } from 'react'
import { UserType } from '../../_enums/userType'
import layout from '../../layouts/unauth'
import CreateUser from '../../components/users/Create'

const Page = (): ReactElement => {
  return (
    <>
      <CreateUser type={UserType.CUSTOMER} />
    </>
  )
}

export default layout(Page, { title: 'Sign Up' })
