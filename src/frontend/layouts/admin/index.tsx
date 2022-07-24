import { NextPage } from 'next'
import { ReactElement, FunctionComponent, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetUser } from '../query'
import styles from '../../styles/_layouts/admin/main'
import { User } from '../../../types/user'
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
    const [open, setOpen] = useState(false)

    const { data } = useQuery(GetUser)

    const user: User = data?.get_user || {}

    return (
      <>
        <Navbar
          open={open}
          onClose={(): void => setOpen(false)}
          permanent={true}
          user={user}
        />
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
