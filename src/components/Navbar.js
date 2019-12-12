import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import PostAddIcon from '@material-ui/icons/PostAdd';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import HomeIcon from '@material-ui/icons/Home';
// util
import MyButton from '../util/MyButton';

// redux stuff
import { connect } from 'react-redux';
export class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar position="fixed" color="primary">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                             <MyButton tip="Add a project" >
                                <PostAddIcon />
                            </MyButton>
                            <MyButton tip="Home">
                                <HomeIcon />
                            </MyButton>
                            <MyButton tip="Notifications">
                                <NotificationsActiveIcon />
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login" >Login</Button>
                            <Button color="inherit" component={Link} to="/" >Home</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);