import { NextPage } from 'next'
import { ReactElement, FunctionComponent, useState } from 'react'
import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import { useQuery } from '@apollo/client'
import { theme } from '../../themes'
import { GetUser } from '../query'
import { User } from '../../../types/user'
import { MainWrapper, PageWrapper } from '../common'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'

export default (Page: FunctionComponent, { title }: { title?: string }) =>
  (): FunctionComponent | NextPage | ReactElement => {
    const [open, setOpen] = useState<boolean>(true)
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

    const { data } = useQuery(GetUser)
    const user: User = data?.get_user || null
    if (!user) return <Page />

    return (
      <>
        <MainWrapper>
          <Header
            sx={{
              paddingLeft: open && lgUp ? '265px' : '',
              backgroundColor: '#ffffff'
            }}
            toggleMobileNavbar={() => setMobileOpen(true)}
            toggleNavbar={() => setOpen(!open)}
          />
          <Navbar
            mobileOpen={mobileOpen}
            open={open}
            onClose={() => setMobileOpen(false)}
          />
          <PageWrapper>
            <Container
              maxWidth={false}
              sx={{
                paddingTop: '20px',
                paddingLeft: open && lgUp ? '300px!important' : '40px!important'
              }}
            >
              <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                <Typography sx={{ marginBottom: 2 }} variant={'h1'}>
                  {title}
                </Typography>
                <Page />
              </Box>
              <Footer />
            </Container>
          </PageWrapper>
        </MainWrapper>
      </>
    )
  }
