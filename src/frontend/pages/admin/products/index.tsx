import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import ProductsTable from '../../../components/products/View/table'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  const router = useRouter()

  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_PRODUCT}>
      <Button
        color={'primary'}
        disabled={!authenticateUser(AdminPermission.CREATE_PRODUCT)}
        fullWidth
        onClick={(): void => {
          router.push('products/create')
        }}
        type='submit'
        variant={'contained'}
      >
        {'Create Product'}
      </Button>
      <ProductsTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Products' })
