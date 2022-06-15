import { NextPage } from 'next'
import React, { ReactElement, FunctionComponent } from 'react'
import theme from '../themes'
import styled from '@emotion/styled'
import Navbar from './consumer/Navbar'
import Header from './consumer/Header'
import classnames from 'classnames'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: theme.spacing(4),
    minHeight: process.browser
      ? window.innerHeight * 0.75 - Number(theme.mixins.toolbar.minHeight)
      : '75vh'
  },
  narrow: {
    maxWidth: theme.spacing(128)
  },
  wide: {}
}

const Div = styled('div')({
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(8)
  },
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(),
    marginRight: theme.spacing(),
    marginLeft: theme.spacing(),
    marginBottom: theme.spacing(4)
  }
})

export default (
    Page: FunctionComponent,
    { title, backRoute, wide }: { title: string; backRoute: string; wide?: boolean }
  ) =>
  (): FunctionComponent | NextPage | ReactElement => {
    return (
      <>
        <Navbar />
        <Header pageTitle={title} backRoute={backRoute} />
        <div
          className={
            wide
              ? classnames(styles.root, styles.wide)
              : classnames(styles.root, styles.narrow)
          }
        >
          <Div>
            <Page />
          </Div>
        </div>
      </>
    )
  }
