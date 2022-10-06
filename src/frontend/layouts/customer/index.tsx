import { NextPage } from 'next'
import { ReactElement, FunctionComponent, useState, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { MainWrapper, PageWrapper } from '../common'
import Header from './Header'
import Navbar from './Navbar'
import Footer from '../admin/Footer'

export default (Page: FunctionComponent, { title }: { title?: string }) =>
  (): FunctionComponent | NextPage | ReactElement => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const [width, setWidth] = useState<number>(0)

    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth)
    }

    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange)
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange)
      }
    }, [])

    const isMobile = true

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
                <Typography sx={{ marginBottom: 3 }} variant={'h1'}>
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
