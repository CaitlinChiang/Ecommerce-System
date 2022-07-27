import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AdminPermission } from '../../../../../_enums/adminPermission'
import layout from '../../../../../layouts/admin'
import UpdateProductVariant from '../../../../../components/productVariants/Update'
import NoPermissions from '../../../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.UPDATE_PRODUCT_VARIANT)) {
    return <NoPermissions />
  }

  const router = useRouter()
  const productVariantId = router?.query?.productVariantId as string

  return (
    <>
      <UpdateProductVariant _id={productVariantId} />
    </>
  )
}

export default layout(Page, {
  title: 'Update Product Variant',
  backRoute: true
})
