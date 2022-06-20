import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import layout from '../../../layouts'
import ProductsTable from '../../../components/products/Showcase/table'

const Page = (): ReactElement => {
  const router = useRouter()

  return (
    <>
      <Button
        color={'primary'}
        fullWidth
        onClick={() => router.push('products/create')}
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
