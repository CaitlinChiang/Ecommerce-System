import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import PaymentMethodsTable from '../../../components/paymentMethods/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_PAYMENT_METHOD}>
      <PaymentMethodsTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Payment Methods' })
