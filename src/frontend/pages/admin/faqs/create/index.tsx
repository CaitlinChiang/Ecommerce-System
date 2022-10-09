import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedAccess from '../../../../components/users/Authorization'
import CreateFAQ from '../../../../components/faqs/Create'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.CREATE_FAQ}>
      <CreateFAQ />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Create Frequently Asked Question' })
