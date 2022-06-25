import { ReactElement } from 'react'
import layout from '../../../layouts'
import AdministratorsTable from '../../../components/users/Showcase/administrators/table'

const Page = (): ReactElement => {
  return (
    <>
      <AdministratorsTable />
    </>
  )
}

export default layout(Page, { title: 'Administrators' })
