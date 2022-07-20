import theme from '../themes'

export const image = {
  height: 233,
  width: 350,
  maxHeight: { xs: 233, md: 167 },
  maxWidth: { xs: 350, md: 250 }
}

export const bottomContainer = {
  marginTop: 10
}

export const button = {
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1)
  }
}
