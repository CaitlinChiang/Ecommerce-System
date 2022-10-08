import { createTheme } from '@mui/material/styles'
import components from './Component'
import typography from './Typography'
import shadows from './Shadow'

const SidebarWidth = 265
const TopbarHeight = 70

const baseTheme = {
  palette: {
    primary: {
      main: '#1a97f5',
      light: '#e6f4ff',
      dark: '#1682d4'
    },
    secondary: {
      main: '#d48130',
      light: '#ddebff',
      dark: '#c1854a'
    },
    success: {
      main: '#00c292',
      light: '#ebfaf2',
      dark: '#00964b',
      contrastText: '#ffffff'
    },
    danger: {
      main: '#e46a76',
      light: '#fdf3f5'
    },
    info: {
      main: '#1e4db7',
      light: '#a7e3f4'
    },
    error: {
      main: '#e46a76',
      light: '#fdf3f5',
      dark: '#e45a68'
    },
    warning: {
      main: '#fec90f',
      light: '#fff4e5',
      dark: '#dcb014',
      contrastText: '#ffffff'
    },
    text: {
      secondary: '#777e89',
      danger: '#fc4b6c'
    },
    grey: {
      A100: '#ecf0f2',
      A200: '#99abb4',
      A400: '#767e89',
      A700: '#e6f4ff'
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: 'rgba(0, 0, 0, 0.03)'
    }
  },
  shape: {
    borderRadius: 5
  },
  mixins: {
    toolbar: {
      color: '#949db2',
      '@media(min-width:1280px)': {
        minHeight: TopbarHeight,
        padding: '0 30px'
      },
      '@media(max-width:1280px)': {
        minHeight: '64px'
      }
    }
  },
  status: {
    danger: '#e53e3e'
  },
  components,
  typography,
  shadows
}

const theme = createTheme(baseTheme)

export { TopbarHeight, SidebarWidth, theme }
