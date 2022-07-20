import { NextPage } from 'next'
import React, { ReactElement, FunctionComponent } from 'react'
import styles from '../../styles/_layouts/customer/main'
import Navbar from './Navbar'
import Header from './Header'
import classnames from 'classnames'

export default (
    Page: FunctionComponent,
    {
      title,
      backRoute,
      wide
    }: { title?: string; backRoute?: boolean; wide?: boolean }
  ) =>
  (): FunctionComponent | NextPage | ReactElement => {
    return (
      <>
        <Navbar />
        {title && <Header pageTitle={title} backRoute={backRoute} />}
        <div
          className={
            wide
              ? classnames(styles.root, styles.wide)
              : classnames(styles.root, styles.narrow)
          }
        >
          <div style={styles.container}>
            <Page />
          </div>
        </div>
      </>
    )
  }
