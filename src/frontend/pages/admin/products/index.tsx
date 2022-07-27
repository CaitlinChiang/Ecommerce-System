import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import ProductsTable from '../../../components/products/View/table'
import NoPermissions from '../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.VIEW_PRODUCT)) return <NoPermissions />

  const router = useRouter()

  return (
    <>
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
    </>
  )
}

export default layout(Page, { title: 'Products' })
