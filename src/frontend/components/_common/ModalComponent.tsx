import { ReactElement } from 'react'
import theme from '../../themes'
import styles from '../../styles/_common/modalComponent'
import {
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery
} from '@mui/material'

const ModalComponent = ({
  content,
  loading,
  onClose,
  open,
  title
}: {
  content: ReactElement
  loading?: boolean
  onClose?: VoidFunction
  open: boolean
  title?: string
}): ReactElement => {
  return (
    <>
      <Dialog
        fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
        maxWidth={'lg'}
        onClose={onClose}
        open={Boolean(open)}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Collapse in={Boolean(!loading && content)}>{content}</Collapse>
          <Collapse in={loading} sx={styles.dialogCollapse}>
            <CircularProgress />
          </Collapse>
        </DialogContent>
        <DialogActions disableSpacing>
          <Button color={'secondary'} onClick={onClose}>
            {'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModalComponent
