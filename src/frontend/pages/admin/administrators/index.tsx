import React, { ReactElement } from 'react'
import layout from '../../../layouts'
import AdminTable from '../../../components/users/Showcase/adminTable'

const Page = (): ReactElement => {
  return (
    <>
      <AdminTable />
    </>
  )
}

export default layout(Page, { title: 'Administrators', backRoute: '/' })
