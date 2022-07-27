import { ReactElement, useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { refetchData } from '../../../_utils/handleData/refetchData'
import {
  returnAdminPermissions,
  formatPermissionCategory,
  allCategoryPermissions,
  checkAll,
  uncheckAll
} from '../../../_utils/handleFormatting/formatAdminPermissions'

const globalAny: any = global

const UpdateAdminPermissions = ({
  _id,
  permissions,
  refetchArgs
}: {
  _id: ObjectId
  permissions: AdminPermission[]
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [adminPermissions, setAdminPermissions] = useState<string[]>([])

  useEffect(() => {
    if (permissions?.length > 0) {
      setAdminPermissions(permissions)
    }
  }, [permissions])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, permissions: adminPermissions },
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
    <>
      <TableContainer>
        <Table size={'small'}>
          <TableHead>
            <TableRow>
              {permissionHeaders.map(
                (header: string, index: number): ReactElement => {
                  return (
                    <TableCell key={index} align={'center'} padding={'checkbox'}>
                      {header}
                    </TableCell>
                  )
                }
              )}
            </TableRow>
          </TableHead>
          <TableBody>{permissionRows}</TableBody>
        </Table>
      </TableContainer>
      <Button
        disabled={updateMutationState.loading}
        onClick={(): void => {
          updateMutation()
        }}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateAdminPermissions
