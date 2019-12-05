import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux stuff
import { connect } from 'react-redux';

// MUI stuff
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// styles
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import { theme } from '../util/theme';

// Icons
import EmailIcon from '@material-ui/icons/Email'; //email


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
			width: 200,
			height: 200,
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
					<hr />

					{/* profile details */}
					<div className="profile-details">
						<MuiLink component={Link} to={`/developers/${handle}`} variant="h5" color="primary">
							{' '}
							{handle}{' '}
						</MuiLink> <br/>
                        {bio && <span className="bio-text" >{bio}</span>} <br/> <br/>

                        { company && (
                            <Fragment>
                                <WorkIcon color="primary"/> <span> {company} <span className="company">company</span> </span>
                            </Fragment>
                        )} <br/>

                        { website && (
                            <Fragment>
                                <LanguageIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer" >
                                  { website}
                                </a>
                            </Fragment>
                        )} <br/>

                        { email && (
                            <Fragment>
                                <EmailIcon color="primary"/> <span> {email} </span>
                            </Fragment>
                        )} <br/>

						{location && (
							<Fragment>
								<PersonPinIcon color="primary" /> <span> {location} </span>
							</Fragment>
						)}
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
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
