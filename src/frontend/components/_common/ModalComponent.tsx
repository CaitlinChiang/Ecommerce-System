import { ReactElement } from 'react'
import {
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'

const ModalComponent = ({
  content,
  loading,
  onClose,
  open,
  primaryButtonTitle,
  primaryButtonOnClick,
  title
}: {
  content: ReactElement
  loading?: boolean
  onClose?: VoidFunction
  open: boolean
  primaryButtonTitle?: string
  primaryButtonOnClick?: VoidFunction
  title?: string
}): ReactElement => {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth={'lg'}
        onClose={onClose}
        open={Boolean(open)}
        PaperProps={{ style: { borderRadius: 20 } }}
      >
        <DialogTitle>
          <Typography variant={'h3'}>{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <Collapse in={Boolean(!loading && content)}>{content}</Collapse>
          <Collapse in={loading}>
            <CircularProgress />
          </Collapse>
        </DialogContent>
        <DialogActions disableSpacing>
          <Button
            color={'secondary'}
            onClick={onClose}
            sx={{ marginRight: 2 }}
            variant={'outlined'}
          >
            {'Close'}
          </Button>
          {primaryButtonOnClick && (
            <Button
              disabled={loading}
              color={'primary'}
              onClick={primaryButtonOnClick}
              sx={{ marginRight: 2 }}
              variant={'contained'}
            >
              {primaryButtonTitle || 'Save'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModalComponent
