import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import layout from '../../../layouts/admin'
import ProductsTable from '../../../components/products/View/table'

const Page = (): ReactElement => {
  const router = useRouter()

  return (
    <>
      <Button
        color={'primary'}
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
