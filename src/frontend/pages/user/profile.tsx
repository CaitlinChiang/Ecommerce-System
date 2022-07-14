import { ReactElement } from 'react'
import layout from '../../layouts'
import UpdateUser from '../../components/users/Update'

const Page = (): ReactElement => {
  return (
    <>
      <UpdateUser />
    </>
  )
}

export default layout(Page, { title: 'Profile' })
