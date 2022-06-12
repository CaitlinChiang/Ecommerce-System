import { ReactElement } from 'react'
import theme from '../../themes'
import {
  Button,
  Collapse,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery
} from '@mui/material'

const ModalComponent = ({
  open,
  onClose,
  title,
  content,
  loading,
  primaryButtonTitle,
  primaryButtonOnClick,
  primaryButtonDisabled,
  secondaryButtonTitle,
  secondaryButtonOnClick,
  secondaryButtonDisabled,
  maxWidth,
  fullScreen
}: {
  open: boolean
  onClose?: VoidFunction
  title?: string
  content?: ReactElement
  loading?: boolean
  primaryButtonTitle?: string
  primaryButtonOnClick?: VoidFunction
  primaryButtonDisabled?: boolean
  secondaryButtonTitle?: string
  secondaryButtonOnClick?: VoidFunction
  secondaryButtonDisabled?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  fullScreen?: boolean
}): ReactElement => {
  return (
    <>
      <Dialog
        fullScreen={fullScreen || useMediaQuery(theme.breakpoints.down('sm'))}
        open={Boolean(open)}
        onClose={onClose}
        maxWidth={maxWidth || 'lg'}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <Collapse in={Boolean(!loading && content)}>{content}</Collapse>
          <Collapse
            in={loading}
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Collapse>
        </DialogContent>
        <DialogActions
          disableSpacing
          sx={{
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column'
            }
          }}
        >
          {secondaryButtonTitle && (
            <Button
              id={'modal-secondary-button'}
              color={'secondary'}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  marginTop: theme.spacing(1)
                }
              }}
              onClick={secondaryButtonOnClick}
              disabled={loading || Boolean(secondaryButtonDisabled)}
            >
              {secondaryButtonTitle}
            </Button>
          )}
          {primaryButtonTitle && (
            <Button
              id={'modal-primary-button'}
              color={'primary'}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  marginTop: theme.spacing(1)
                }
              }}
              onClick={primaryButtonOnClick}
              disabled={loading || Boolean(primaryButtonDisabled)}
            >
              {primaryButtonTitle}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModalComponent
