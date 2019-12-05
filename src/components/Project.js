import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// react-router
import { Link } from 'react-router-dom';

// Card UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

// Icons
import GitHubIcon from '@material-ui/icons/GitHub';

import { theme } from '../util/theme';

const styles = theme => ({
    darkColor: {
        color: theme.palette.primary.dark
    },
    card:{
        display: 'flex',
        color: theme.palette.primary.dark,
        '& .gitLink': {
            fontSize: 13
        },
        '& svg, a': {
            verticalAlign: 'middle'
        }
    },
    image: {
        minWidth: 200
    },
    content: {
        marginBottom: 20
    }
})

class Project extends Component {
    render() {
        const { classes, 
            project: { 
                title, 
                overview, 
                imageUrl, 
                devHandle, 
                gitLink, 
                help, 
                contributorCount,
                SuggestionCount,
                createdAt
            }} = this.props;
        return (
            <div>
                <Card className={classes.card} >
                    <CardMedia image={imageUrl} className={classes.image} />

                    <CardContent className={classes.content}>
                        <Typography variant="h5" color="primary" component={Link} to="/developers/${devHandle}" > {devHandle} </Typography>
                        <Typography color="secondary"> {title} <span>(Project Title)</span> </Typography> <br/>

                        <Typography variant="h6"> Overview </Typography>
                        <Typography> {overview} </Typography>
                        <Fragment>
                            <GitHubIcon color="primary"/> 
                            <a href={gitLink} target="_blank" rel="noopener noreferrer" className="gitLink" >
                               {"  "} {gitLink}
                            </a>
                        </Fragment> <br/>
                        
                        <Typography color="textSecondary" variant="caption" > {createdAt} </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Project.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Project);
