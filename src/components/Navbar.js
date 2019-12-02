import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export class Navbar extends Component {
    render() {
        return (
            <AppBar position="fixed" color="primary">
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login" >Login</Button>
                    <Button color="inherit" component={Link} to="/" >Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;
