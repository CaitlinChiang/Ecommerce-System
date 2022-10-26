import { ReactElement } from 'react'
import NextLink from 'next/link'
import { Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { formatWindowLocation } from '../../_utils/handleFormat/formatWindowLocation'

const BreadCrumbs = (): ReactElement => {
  if (typeof window === 'undefined') return

  const location = window.location.pathname
  const pages = location.split('/')
  const numberOfPages = pages.length - 1

  if (numberOfPages <= 1) return
  if (numberOfPages === 2 && location.includes('/admin')) return

  const breadcrumbs: ReactElement[] = []

  for (let i = 0; i < numberOfPages; i++) {
    const previousPage = pages[i]
    let currentPage = formatWindowLocation(pages[i + 1])

    let routerPath = location.substring(0, location.indexOf(pages[i + 2]))

    if (previousPage === 'shop' || previousPage === 'products') {
      const productId = currentPage.substring(1)
      routerPath = location.substring(0, location.indexOf(pages[i + 1])) + productId

      currentPage = 'Product'
    }

    if (previousPage === 'variants') {
      const productVariantId = currentPage.substring(1)
      routerPath =
        location.substring(0, location.indexOf(pages[i + 1])) + productVariantId

      currentPage = 'Product Variant'
    }

    let breadcrumb = (
      <NextLink href={routerPath}>
        <Typography
          color={'primary'}
          sx={{
            '&:hover': {
              cursor: 'pointer',
              textDecoration: 'underline'
            }
          }}
        >
          {currentPage}
        </Typography>
      </NextLink>
    )

    if (i === numberOfPages - 1) {
      breadcrumb = <Typography color={'textSecondary'}>{currentPage}</Typography>
    }

    if (pages[i - 1] !== 'products') {
      breadcrumbs.push(breadcrumb)
    }
  }

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export default BreadCrumbs
