import theme from '../themes'

const styles = {
  aboutWriteup: {
    maxWidth: 550,
    marginTop: 5,
    marginLeft: 120,
    textAlign: 'right'
  },
  contactInfoHeader: {
    marginBottom: 4
  },
  contactInfoText: {
    display: 'inline-block',
    marginRight: 5
  },
  homeSlogan: {
    maxWidth: 550
  },
  homeVisitShop: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    }
  }
}

export default styles
