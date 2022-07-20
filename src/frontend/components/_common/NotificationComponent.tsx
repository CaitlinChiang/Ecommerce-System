import { ReactElement, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

const globalAny: any = global

const NotificationComponent = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  globalAny.setNotification = (success: boolean, message: string): void => {
    setOpen(true)
    setSuccess(success)
    setMessage(message)
  }

  return (
    <Snackbar
      autoHideDuration={6000}
      onClose={(): void => {
        setOpen(false)
        setSuccess(false)
        setMessage('')
      }}
      open={open}
    >
      <Alert severity={success ? 'success' : 'error'}>{message}</Alert>
    </Snackbar>
  )
}

export default NotificationComponent
