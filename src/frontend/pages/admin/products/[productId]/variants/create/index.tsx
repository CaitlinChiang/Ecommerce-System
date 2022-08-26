import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { AdminPermission } from '../../../../../../_enums/adminPermission'
import layout from '../../../../../../layouts/admin'
import AuthorizedPath from '../../../../../../components/users/Authorization'
import CreateProductVariant from '../../../../../../components/productVariants/Create'

const Page = (): ReactElement => {
  const router = useRouter()
  const productId = router?.query?.productId as string

  return (
    <AuthorizedPath permission={AdminPermission.CREATE_PRODUCT_VARIANT}>
      <CreateProductVariant _productId={productId} />
    </AuthorizedPath>
  )
}

export default layout(Page, {
  title: 'Create Product Variant',
  backRoute: true
})
