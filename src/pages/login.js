import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

// IMAGE
import Icon from '../images/dev.png'

// FORM MUI ELEMENTS
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// MUI
import Grid from '@material-ui/core/Grid'

const styles = {
    form: {
        textAlign: 'center',
        fontVariant: 'small-caps',
        fontFamily: 'Times'
    },
    image: {
        width: 100,
        margin: '20px auto'
    },
    button: {
        marginTop: 10
    }
}

export class login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        if(userData.email === '' || userData.password === ''){
            this.setState({
                errors: {
                    emailError: "Email cannot be empty",
                    passwordError: "Please provide a password"
                }
            }, () => {
                console.log('email error:', this.state.errors)
            })
        }

        axios.post('/login', userData )
            .then(res =>{
                this.setState({
                    loading: false
                })
                console.log(res.data)
                localStorage.setItem('FBIdToken', `Bearer ${res.data.loginToken}`);
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({
                    errors: {
                        general: 'Please verify your credentials'
                    },
                    loading: false
                });
                console.log(err.response.data)
            })
    }


    render() {
        const { classes } = this.props;
        const { errors: {emailError, passwordError, general}, loading } = this.state;
        return (
            <div>
                <Grid container className={classes.form}>
                    <Grid item sm/>
                    <Grid item sm xs>
                    <img src={Icon} alt="DevUnited" className={classes.image} />
                    <Typography variant="h4" color="secondary"> LOGIN </Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            variant="outlined"
                            margin="dense"
                            error={emailError || general ? true : false}
                            helperText={emailError ? emailError : general}
                            />
                        
                        <TextField 
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            variant="outlined"
                            margin="dense"
                            error={passwordError ? true : false}
                            helperText={passwordError}
                            />

                    <br/>
                    {loading && <CircularProgress />} <br/>
                    <Button 
                    color="primary" 
                    variant="contained" 
                    type="submit" 
                    className={classes.button}
                    disabled={!!loading}
                    > Login 
                    </Button>


                    <Typography>
                        Don't have an account ? Please  <Link to="/signup">signup</Link> 
                    </Typography>

                    </form>

                    </Grid>
                    <Grid item sm/>
                </Grid>
            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);
