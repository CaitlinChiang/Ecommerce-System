import { ReactElement } from 'react'
import layout from '../../../layouts/admin'
import CreateUser from '../../../components/users/Create'
import { UserType } from 'frontend/_enums/userType'

const Page = (): ReactElement => {
  return (
    <>
      <CreateUser type={UserType.ADMINISTRATOR} />
    </>
  )
}

export default layout(Page, { title: 'Create Account' })
