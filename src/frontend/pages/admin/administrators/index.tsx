import React, { ReactElement } from 'react'
import layout from '../../../layouts'
import AdminsTable from '../../../components/users/Showcase/adminsTable'

const Page = (): ReactElement => {
  return (
    <>
      <AdminsTable />
    </>
  )
}

export default layout(Page, { title: 'Administrators' })
