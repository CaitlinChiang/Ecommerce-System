import { NextPage } from 'next'
import { ReactElement, FunctionComponent, useState } from 'react'
import { Box, Container, useMediaQuery } from '@mui/material'
import { theme } from '../../themes'
import { MainWrapper, PageWrapper } from '../common'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

export default (Page: FunctionComponent) =>
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
            <Container maxWidth={false} style={{ marginLeft: -15 }}>
              <Box>
                <Page />
              </Box>
              <Footer />
            </Container>
          </PageWrapper>
        </MainWrapper>
      </>
    )
  }
