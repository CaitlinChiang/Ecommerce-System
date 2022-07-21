import { ReactElement } from 'react'
import { UserType } from '../../_enums/userType'
import layout from '../../layouts/customer'
import UpdateUser from '../../components/users/Update'

const Page = (): ReactElement => {
  return (
    <>
      <UpdateUser type={UserType.CUSTOMER} />
    </>
  )
}

export default layout(Page, { title: 'Profile' })
