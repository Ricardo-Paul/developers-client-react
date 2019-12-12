import React, { Component, Fragment } from 'react';
import { theme } from '../util/theme';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { editDeveloperDetails } from '../redux/actions/userActions';

// dialog stuff
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog  from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    // ...theme
})

export class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        company: '',
        open: false
    }

    componentDidMount(){
        this.mapDevCredentialsToState(this.props.devCredentials);
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.mapDevCredentialsToState(this.props.devCredentials);
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    mapDevCredentialsToState = (devCredentials) => {
        if(devCredentials.bio === ''){
            this.setState({ bio: ''})
        }
        this.setState({
            bio: devCredentials.bio ? devCredentials.bio : this.state.bio,
            website: devCredentials.website ? devCredentials.website : '',
            location: devCredentials.location ? devCredentials.location : '',
            company: devCredentials.company ? devCredentials.company : ''

        })
    }

    handleSubmit = () => {
        const developerDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
            company: this.state.company
        }
        this.props.editDeveloperDetails(developerDetails);
        this.handleClose();
    }



    render() {
        return (
            <Fragment>
                {/* button */}
                <Tooltip title="Edit details" placement="right-end" >
                    <IconButton onClick={this.handleOpen} >
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>

            {/* Dialog */}
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
            >

            <DialogTitle variant="primary" >Edit Details</DialogTitle>

            <DialogContent>
                <form>
                    <TextField 
                        name="bio"
                        type="text"
                        label="Biography"
                        fullWidth
                        multiline
                        rows="3"
                        onChange={this.handleChange}
                        value={this.state.bio}
                        placeholder="Tell us about yourself"
                    />
                    <TextField 
                        name="website"
                        type="text"
                        label="website"
                        fullWidth
                        onChange={this.handleChange}
                        value={this.state.website}
                        placeholder="On the web"
                    />

                    <TextField 
                        name="location"
                        type="text"
                        label="Location"
                        fullWidth
                        onChange={this.handleChange}
                        value={this.state.location}
                        placeholder="Where are you living ?"
                    />

                    <TextField 
                        name="company"
                        type="text"
                        label="company"
                        fullWidth
                        onChange={this.handleChange}
                        value={this.state.company}
                        placeholder="Company"
                    />
                </form>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions>
                <Button onClick={this.handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
            </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    devCredentials: state.user.devCredentials
})

EditDetails.propTypes = {
    devCredentials: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    editDeveloperDetails: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { editDeveloperDetails })(withStyles(styles)(EditDetails))