import { ReactElement } from 'react'
import { AdminPermission } from '../../../../_enums/adminPermission'
import layout from '../../../../layouts/admin'
import AuthorizedAccess from '../../../../components/users/Authorization'
import CreatePaymentMethod from '../../../../components/paymentMethods/Create'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.CREATE_PAYMENT_METHOD}>
      <CreatePaymentMethod />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Create Payment Method' })
