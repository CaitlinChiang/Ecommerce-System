import { ReactElement } from 'react'
import { Typography } from '@mui/material'

const UpdateHistory = ({
  obj,
  product
}: {
  obj: any
  product?: boolean
}): ReactElement => {
  if (product) {
    return (
      <>
        <Typography variant={'h4'}>{`Created At: ${obj?.createdAt} ${
          obj?.createdByEmail && 'by ' + obj?.createdByEmail
        }`}</Typography>
        <Typography sx={{ marginBottom: 2 }} variant={'h4'}>{`Last Updated At: ${
          obj?.updatedAt
        } ${obj?.updatedByEmail && 'by ' + obj?.updatedByEmail}`}</Typography>
      </>
    )
  }

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
