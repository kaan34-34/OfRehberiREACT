import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7f1810',      // trabzon-bordo
      light: '#933933',     // trabzon-acik-bordo
      dark: '#5a110b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#458cb9',      // trabzon-koyu-mavi
      light: '#6babd3',     // trabzon-mavi
      dark: '#2d6a8e',
      contrastText: '#fff',
    },
    warning: {
      main: '#d6a64c',      // trabzon-altin
      contrastText: '#fff',
    },
    dark: {
      main: '#2d3e50',      // trabzon-koyu
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 25,
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333333',
        },
      },
    },
  },
});

export default theme;
