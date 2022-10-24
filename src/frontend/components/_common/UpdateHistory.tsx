import { ReactElement } from 'react'
import { Typography } from '@mui/material'

const UpdateHistory = ({ obj }: { obj: any }): ReactElement => {
  return (
    <>
      <Typography>{`Created At: ${obj?.createdAt} ${
        obj?.createdByEmail && 'by ' + obj?.createdByEmail
      }`}</Typography>
      <Typography>{`Last Updated At: ${obj?.updatedAt} ${
        obj?.updatedByEmail && 'by ' + obj?.updatedByEmail
      }`}</Typography>
    </>
  )
}

export default UpdateHistory
