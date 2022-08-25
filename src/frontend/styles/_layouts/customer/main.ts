import theme from '../../../themes'

const styles = {
  container: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(5)
  },
  narrow: {
    maxWidth: theme.spacing(130)
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: theme.spacing(4),
    minHeight:
      typeof window !== 'undefined'
        ? window.innerHeight * 0.75 - Number(theme.mixins.toolbar.minHeight)
        : '75vh'
  },
  wide: {}
}

export default styles
