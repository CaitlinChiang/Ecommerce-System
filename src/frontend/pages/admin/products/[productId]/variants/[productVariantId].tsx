import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AdminPermission } from '../../../../../_enums/adminPermission'
import layout from '../../../../../layouts/admin'
import AuthorizedAccess from '../../../../../components/users/Authorization'
import UpdateProductVariant from '../../../../../components/productVariants/Update'

const Page = (): ReactElement => {
  const router = useRouter()
  const productVariantId = router?.query?.productVariantId as string

  return (
    <AuthorizedAccess permission={AdminPermission.UPDATE_PRODUCT_VARIANT}>
      <UpdateProductVariant _id={productVariantId} />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Update Product Variant' })
