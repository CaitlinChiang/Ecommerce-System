import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import FAQsDropdowns from '../../../components/faqs/View/administrators/dropdowns'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_FAQ}>
      <FAQsDropdowns />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Frequently Asked Questions' })
