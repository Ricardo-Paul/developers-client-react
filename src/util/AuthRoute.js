import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// redux stuff
import { connect } from 'react-redux';
import { SET_AUTHENTICATED } from '../redux/types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
    {...rest}
    render={ (props) => authenticated === true ? <Redirect to='/' /> : <Component {...props}/> }
    />
)

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute);