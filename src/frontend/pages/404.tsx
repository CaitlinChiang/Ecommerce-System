import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { ReactElement } from 'react'
import layout from '../layouts/customer'

const NotFoundPage: NextPage = (): ReactElement => {
  return (
    <>
      <Typography variant={'h1'}>{'Page does not exist.'}</Typography>
    </>
  )
}

export default layout(NotFoundPage, {})
