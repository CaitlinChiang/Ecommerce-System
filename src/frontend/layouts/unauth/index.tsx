import { NextPage } from 'next'
import React, { ReactElement, FunctionComponent } from 'react'
import styles from '../../styles/_layouts/customer/main'
import Header from '../customer/Header'
import classnames from 'classnames'

export default (
    Page: FunctionComponent,
    { title, wide }: { title?: string; wide?: boolean }
  ) =>
  (): FunctionComponent | NextPage | ReactElement => {
    return (
      <>
        <Header pageTitle={title} />
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
