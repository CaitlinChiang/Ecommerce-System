import { ReactElement } from 'react'
import theme from '../../themes'
import styles from '../../styles/_common/modalComponent'
import {
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery
} from '@mui/material'

const ModalComponent = ({
  content,
  loading,
  maxWidth,
  onClose,
  open,
  title
}: {
  content: ReactElement
  loading?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  onClose?: VoidFunction
  open: boolean
  title?: string
}): ReactElement => {
  return (
    <>
      <Dialog
        fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
        maxWidth={maxWidth || 'lg'}
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
      </Dialog>
    </>
  )
}

export default ModalComponent
