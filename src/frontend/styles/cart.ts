import theme from '../themes'

const styles = {
  bottomContainer: {
    marginTop: 10
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    }
  },
  image: {
    height: 233,
    width: 350,
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 }
  }
}

export default styles
