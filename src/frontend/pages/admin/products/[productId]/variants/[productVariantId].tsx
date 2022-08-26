import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AdminPermission } from '../../../../../_enums/adminPermission'
import layout from '../../../../../layouts/admin'
import AuthorizedPath from '../../../../../components/users/Authorization'
import UpdateProductVariant from '../../../../../components/productVariants/Update'

const Page = (): ReactElement => {
  const router = useRouter()
  const productVariantId = router?.query?.productVariantId as string

  return (
    <AuthorizedPath permission={AdminPermission.UPDATE_PRODUCT_VARIANT}>
      <UpdateProductVariant _id={productVariantId} />
    </AuthorizedPath>
  )
}

export default layout(Page, {
  title: 'Update Product Variant',
  backRoute: true
})
