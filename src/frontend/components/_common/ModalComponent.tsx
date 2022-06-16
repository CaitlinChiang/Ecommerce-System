import { ReactElement } from 'react'
import theme from '../../themes'
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
  fullScreen,
  loading,
  maxWidth,
  onClose,
  open,
  primaryButtonDisabled,
  primaryButtonOnClick,
  primaryButtonTitle,
  secondaryButtonDisabled,
  secondaryButtonOnClick,
  secondaryButtonTitle,
  title
}: {
  content: ReactElement
  fullScreen?: boolean
  loading?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  onClose?: VoidFunction
  open: boolean
  primaryButtonDisabled?: boolean
  primaryButtonOnClick?: VoidFunction
  primaryButtonTitle?: string
  secondaryButtonDisabled?: boolean
  secondaryButtonOnClick?: VoidFunction
  secondaryButtonTitle?: string
  title?: string
}): ReactElement => {
  return (
    <>
      <Dialog
        aria-labelledby='responsive-dialog-title'
        fullScreen={fullScreen || useMediaQuery(theme.breakpoints.down('sm'))}
        maxWidth={maxWidth || 'lg'}
        onClose={onClose}
        open={Boolean(open)}
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
              color={'secondary'}
              disabled={loading || Boolean(secondaryButtonDisabled)}
              id={'modal-secondary-button'}
              onClick={secondaryButtonOnClick}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  marginTop: theme.spacing(1)
                }
              }}
            >
              {secondaryButtonTitle}
            </Button>
          )}
          {primaryButtonTitle && (
            <Button
              color={'primary'}
              disabled={loading || Boolean(primaryButtonDisabled)}
              id={'modal-primary-button'}
              onClick={primaryButtonOnClick}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  marginTop: theme.spacing(1)
                }
              }}
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
