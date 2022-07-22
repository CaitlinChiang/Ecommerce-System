import { NextPage } from 'next'
import { ReactElement, useState, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import query from '../query'
import styles from '../../styles/_layouts/admin/main'
import { User } from '../../../types/user'
import { UserType } from '../../_enums/userType'
import Navbar from './Navbar'
import Header from './Header'
import classnames from 'classnames'
import { generateAdminUrl } from '../../_utils/handleData/generateAdminUrl'

export default (
    Page: FunctionComponent,
    {
      title,
      backRoute,
      wide
    }: { title?: string; backRoute?: boolean; wide?: boolean }
  ) =>
  (): FunctionComponent | NextPage | ReactElement => {
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const { data, loading } = useQuery(query)

    const user: User = data?.get_user || {}

    if (loading) return null

    if (Object.keys(user).length === 0) {
      router.push(`${generateAdminUrl(UserType.ADMINISTRATOR)}/user/sign-in`)
      return
    }

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
