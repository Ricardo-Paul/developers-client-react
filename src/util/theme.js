import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
      primary: {
           light: '#ffcdd2',
           main: '#CA3763',
           dark: '#880e4f',
           cardBack: '#f44336',
           contrastText: '#ffebee'
      },
      secondary: {
        main: '#4A4A4A',
        contrastText: '#CA3763'
      }
    }
  });