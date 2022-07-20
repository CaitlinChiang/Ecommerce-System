import theme from '../../../themes'

const styles = {
  container: {
    marginTop: theme.spacing(5),
    marginLeft: 350,
    marginRight: theme.spacing(5)
  },
  narrow: {
    maxWidth: theme.spacing(128)
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
    marginTop: theme.spacing(4),
    minHeight: process.browser
      ? window.innerHeight * 0.75 - Number(theme.mixins.toolbar.minHeight)
      : '75vh'
  },
  wide: {}
}

export default styles
