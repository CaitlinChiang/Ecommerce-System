import { ReactElement } from 'react'
import { UserType } from '../../../_enums/userType'
import layout from '../../../layouts/admin'
import CreateUser from '../../../components/users/Create'

const Page = (): ReactElement => {
  return (
    <>
      <CreateUser type={UserType.ADMINISTRATOR} />
    </>
  )
}

export default layout(Page, { title: 'Create Account' })
