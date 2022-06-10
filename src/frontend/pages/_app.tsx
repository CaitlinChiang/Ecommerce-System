import React, { ReactElement } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@emotion/react'
import theme from '../themes'
import CssBaseline from '@mui/material/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo/client'

class MyApp extends App {
  render(): ReactElement {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>{'E-commerce System'}</title>
          <meta
            name={'viewport'}
            content={
              'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
            }
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default MyApp
