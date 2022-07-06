import { NextPage } from 'next'
import React, { ReactElement, useState, FunctionComponent } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import theme from '../themes'
import styled from '@emotion/styled'
import Navbar from './admin/Navbar'
import Header from './admin/Header'
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
  marginTop: theme.spacing(5),
  marginLeft: 350,
  marginRight: theme.spacing(5)
})

export default (
    Page: FunctionComponent,
    {
      title,
      backRoute,
      wide
    }: { title: string; backRoute?: boolean; wide?: boolean }
  ) =>
  (): FunctionComponent | NextPage | ReactElement => {
    const [open, setOpen] = useState(false)

    const { data, loading } = useQuery(query)
    const user = data?.get_user || {}

    if (loading) return null

    return (
      <>
        <Navbar
          open={open}
          onClose={(): void => {
            setOpen(false)
          }}
          permanent={true}
          user={user}
        />
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
