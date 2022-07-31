import { ReactElement, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

const globalAny: any = global

const NotificationComponent = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(true)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  globalAny.setNotification = (success: boolean, message: string): void => {
    setMessage(message)
    setOpen(true)
    setSuccess(success)
  }

  const modifyMessage = (message: string): string => {
    if (message === 'Response not successful: Received status code 400') {
      return 'Please fill in all required fields.'
    } else {
      return message
    }
  }

  return (
    <Snackbar
      autoHideDuration={6000}
      onClose={(): void => setOpen(false)}
      open={open && message?.length > 0}
    >
      <Alert
        onClose={(): void => setOpen(false)}
        severity={success ? 'success' : 'error'}
      >
        {modifyMessage(message)}
      </Alert>
    </Snackbar>
  )
}

export default NotificationComponent
