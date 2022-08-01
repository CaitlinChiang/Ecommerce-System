import { ReactElement } from 'react'
import { UserType } from '../../../_enums/userType'
import layout from '../../../layouts/admin'
import UpdateUser from '../../../components/users/Update'

const Page = (): ReactElement => {
  return (
    <>
      <UpdateUser type={UserType.ADMINISTRATOR} />
    </>
  )
}

export default layout(Page, { title: 'Profile' })
