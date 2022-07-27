import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AdminPermission } from '../../../../../../_enums/adminPermission'
import layout from '../../../../../../layouts/admin'
import CreateProductVariant from '../../../../../../components/productVariants/Create'
import NoPermissions from '../../../../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.CREATE_PRODUCT_VARIANT)) {
    return <NoPermissions />
  }

  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <>
      <CreateProductVariant _productId={productId} />
    </>
  )
}

export default layout(Page, {
  title: 'Create Product Variant',
  backRoute: true
})
