import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';


// util
import MyButton from '../util/MyButton';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

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
        },
        '& .text-format': {
            fontSize: 13,
            fontFamily: 'monospace',
            color: 'black'
        },
        marginBottom: 15
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

                        <MyButton tip="learn more">
                            <UnfoldMoreIcon color="primary" />
                        </MyButton>
                        <MyButton tip="See on github">
                            <GitHubIcon color="primary" />
                        </MyButton>
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

