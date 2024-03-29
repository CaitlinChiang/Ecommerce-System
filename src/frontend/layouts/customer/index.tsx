import { NextPage } from 'next'
import { ReactElement, FunctionComponent, useState } from 'react'
import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import { theme } from '../../themes'
import { MainWrapper, PageWrapper } from '../common'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import BreadCrumbs from '../../components/_common/BreadcrumbsComponent'

export default (Page: FunctionComponent, { title }: { title?: string }) =>
  (): FunctionComponent | NextPage | ReactElement => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
      <>
        <MainWrapper>
          <Header
            isMobile={isMobile}
            sx={{
              paddingLeft: mobileOpen ? '265px' : '',
              backgroundColor: 'primary'
            }}
            toggleMobileNavbar={() => setMobileOpen(true)}
          />
          {isMobile && (
            <Navbar open={mobileOpen} onClose={() => setMobileOpen(false)} />
          )}
          <PageWrapper>
            <Container maxWidth={false} sx={{ marginTop: 5 }}>
              <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                <Box sx={{ paddingLeft: 2, marginBottom: 1 }}>
                  <BreadCrumbs />
                </Box>
                <Typography sx={{ paddingLeft: 2, marginBottom: 3 }} variant={'h1'}>
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
