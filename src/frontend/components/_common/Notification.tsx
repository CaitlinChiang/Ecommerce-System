import { ReactElement, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

const Notification = ({
  message,
  success
}: {
  message: string
  success: boolean
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <Snackbar
      open={open && success}
      autoHideDuration={6000}
      onClose={(): void => setOpen(false)}
    >
      <Alert
        onClose={(): void => setOpen(false)}
        severity={success ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
