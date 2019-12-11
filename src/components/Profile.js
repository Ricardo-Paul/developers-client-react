import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store  from '../redux/store'

// component
import EditDetails from './EditDetails';

// redux stuff
import { connect } from 'react-redux';
import { uploadImage, logoutUser, getDeveloperData } from '../redux/actions/userActions';

// MUI stuff
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// styles
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import { theme } from '../util/theme';

// Icons
import EmailIcon from '@material-ui/icons/Email'; //email
import  AddPhotoIcon from '@material-ui/icons/AddAPhoto';

import WorkIcon from '@material-ui/icons/Work'; //company
import LanguageIcon from '@material-ui/icons/Language';
import PersonPinIcon from '@material-ui/icons/PersonPin'; //location

const styles = (theme) => ({
	paper: {
        padding: 20,
        textAlign: 'center'
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
	profile: {
		'& .image-wrapper': {
			position: 'relative',
			textAlign: 'center'
		},
		'& .profile-image': {
			width: 150,
			height: 150,
			maxWidth: '100%',
			objectFit: 'cover',
            borderRadius: '50%',
            border: `solid 5px ${theme.palette.primary.main}`
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0'
			},
			'& a': {
				color: theme.palette.primary.main
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer'
				}
            },
            '& .bio-text': {
                fontSize: 13,
                fontFamily: 'monospace'
            },
            '& .company': {
                fontSize: 10
            }
		}
	}
});

class Profile extends Component {

	triggerInputButton = () => {
		const inputButton = document.getElementById('image-input');
		inputButton.click();
	}

	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
		axios.post('/developer/image', formData)
	}

	handleLogout = () => {
		this.props.logoutUser()
	}

	render() {
		const {
			classes,
			user: {
				devCredentials: { handle, email, imageUrl, createdAt, devId, bio, company, location, website, loading },
				authenticated
			}
		} = this.props;

		let profileMarkup = !loading ? authenticated ? (
			<Paper className={classes.paper}>
				{/* profile */}
				<div className={classes.profile}>
					{/* profile image */}
					<div className="image-wrapper">
						<img src={imageUrl} alt="profile image" className="profile-image" />
					</div>
					<input type="file" onChange={this.handleImageChange} id="image-input" hidden />
					<Tooltip title="Edit picture" placement="right-end">
						<IconButton onClick={this.triggerInputButton} >
							<AddPhotoIcon color="primary" />
						</IconButton>
					</Tooltip>
					<hr />

					{/* profile details */}
					<div className="profile-details">
						<MuiLink component={Link} to={`/developers/${handle}`} variant="h5" color="primary">
							{' '}
							{handle}{' '}
						</MuiLink> <br/>
                        {bio && <span className="bio-text" >{bio}</span>} <hr />

                        { company && (
                            <Fragment>
                                <WorkIcon color="primary"/> <span> {company} <span className="company">company</span> </span>
                            </Fragment>
                        )} <hr />

                        { website && (
                            <Fragment>
                                <LanguageIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer" >
                                  { website}
                                </a>
                            </Fragment>
                        )} <hr />

                        { email && (
                            <Fragment>
                                <EmailIcon color="primary"/> <span> {email} </span>
                            </Fragment>
                        )} <hr />

						{location && (
							<Fragment>
								<PersonPinIcon color="primary" /> <span> {location} </span>
							</Fragment>
						)}
						<Tooltip title="logout" placement="right-end" >
							<IconButton onClick={this.handleLogout}>
								<KeyboardReturn color="primary" />
							</IconButton>
						</Tooltip>

						<EditDetails />
					</div>
				</div>
			</Paper>
		) : (
			<Paper>
				<Typography>We fail to authenticate you, please login again</Typography>
				<div className={classes.buttons}>
					<Button variant="contained" color="primary" component={Link} to="/login">
						Login
					</Button>
					<Button variant="contained" color="secondary" component={Link} to="/login">
						Signup
					</Button>
				</div>
			</Paper>
		) : (
			<p>loading...</p>
		);

		return profileMarkup;
	}
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	uploadImage: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

const mapActionsToProps = {
	uploadImage,
	logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
