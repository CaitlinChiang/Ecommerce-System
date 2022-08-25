import { ReactElement, useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox, TableCell, TableRow } from '@mui/material'
import { User } from '../../../../types/user'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import ModalComponent from '../../_common/ModalComponent'
import SimpleTableComponent from '../../_common/SimpleTableComponent'
import { refetchData } from '../../../_utils/handleData/refetchData'
import {
  returnAdminPermissions,
  formatPermissionCategory,
  allCategoryPermissions,
  checkAll,
  uncheckAll
} from '../../../_utils/handleFormat/formatAdminPermissions'

const globalAny: any = global

const UpdateAdminPermissions = ({
  onClose,
  open,
  refetchArgs,
  user
}: {
  onClose: VoidFunction
  open: boolean
  refetchArgs: RefetchDataArgs
  user: User
}): ReactElement => {
  const [adminPermissions, setAdminPermissions] = useState<string[]>([])

  useEffect(() => {
    if (user?.permissions?.length > 0) {
      setAdminPermissions(user.permissions)
    }
  }, [user])

  const [updateMutation] = useMutation(mutation, {
    variables: { ...user, permissions: adminPermissions },
    onCompleted: () => {
      globalAny.setNotification(true, 'Admin permissions successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  const permissionHeaders = ['', 'All', 'View', 'Create', 'Update', 'Delete']

  const permissionRows = [
    Object.keys(returnAdminPermissions()).map((category: string): ReactElement => {
      return (
        <TableRow>
          <TableCell>{formatPermissionCategory(category)}</TableCell>
          <TableCell>
            <Checkbox
              checked={allCategoryPermissions(category, adminPermissions)}
              onChange={(): void => {
                if (allCategoryPermissions(category, adminPermissions)) {
                  setAdminPermissions(uncheckAll(category, adminPermissions))
                } else {
                  setAdminPermissions(checkAll(category, adminPermissions))
                }
              }}
            />
          </TableCell>
          {returnAdminPermissions()[category].map((action: string): ReactElement => {
            if (Object(AdminPermission)[action] === '') {
              return (
                <TableCell>
                  <Checkbox checked={false} disabled={true} />
                </TableCell>
              )
            }

            return (
              <TableCell>
                <Checkbox
                  checked={adminPermissions.includes(action)}
                  onChange={(): void => {
                    if (adminPermissions.includes(action)) {
                      const index = adminPermissions.indexOf(action)
                      setAdminPermissions([
                        ...adminPermissions.slice(0, index),
                        ...adminPermissions.slice(index + 1, adminPermissions.length)
                      ])
                    } else {
                      setAdminPermissions([...adminPermissions, action])
                    }
                  }}
                />
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  ]

  return (
    <ModalComponent
      content={
        <SimpleTableComponent headers={permissionHeaders} rows={permissionRows} />
      }
      onClose={onClose}
      open={open}
      primaryButtonOnClick={(): void => {
        updateMutation()
      }}
      title={'Admin Permissions'}
    />
  )
}

export default UpdateAdminPermissions
