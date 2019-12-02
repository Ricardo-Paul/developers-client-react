import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';

// components
import login from './pages/login';
import home from './pages/home';
import signup from './pages/signup';
import Navbar from './components/Navbar';


const theme = createMuiTheme({
  palette: {
    primary: {
         light: '#f06292',
         main: '#CA3763',
         dark: '#880e4f',
         contrastText: '#ffebee'
    },
    secondary: {
      main: '#4A4A4A',
      contrastText: '#CA3763'
  }
}});

const token = localStorage.FBIdToken;
let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    authenticated = false;
    window.location.href = '/login'
  } else {
    authenticated = true;
  }
  console.log(authenticated)
}

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Router>
       <div className="container">
       <Navbar/>
        <Switch>
          <Route exact path="/" component={home} />
          <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
          <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
        </Switch>
       </div>
      </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;