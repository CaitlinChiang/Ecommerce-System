import { ReactElement, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

const Notification = ({
  success,
  message
}: {
  success: boolean
  message: { success?: string; error?: string }
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={(): void => setOpen(false)}
    >
      <Alert
        onClose={(): void => setOpen(false)}
        severity={success ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {success ? message.success : message.error}
      </Alert>
    </Snackbar>
  )
}

export default Notification
