import { NextPage } from 'next'
import { ReactElement, FunctionComponent } from 'react'
import { Box, Container, Typography } from '@mui/material'
import Footer from '../admin/Footer'

export default (Page: FunctionComponent, { title }: { title?: string }) =>
  (): FunctionComponent | NextPage | ReactElement => {
    return (
      <Container maxWidth={false} sx={{ marginTop: 5 }}>
        <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
          <Typography sx={{ marginBottom: 3 }} variant={'h1'}>
            {title}
          </Typography>
          <Page />
        </Box>
        <Footer />
      </Container>
    )
  }
