import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// react-router
import { Link } from 'react-router-dom';

// Card UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

import { theme } from '../util/theme';

const styles = theme => ({
    darkColor: {
        color: theme.palette.primary.dark
    },
    card:{
        display: 'flex',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
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
                        <Typography variant="h6" className={classes.darkColor} component={Link} to="/developers/${devHandle}" > {devHandle} </Typography>
                        <Typography color="secondary"> {title} </Typography>
                        <Typography> {overview} </Typography>
                        <Typography color="textSecondary"> {createdAt} </Typography>
                        <Typography variant="subtitle2" color="primary" component={Link} to="${gitLink}" > {gitLink} </Typography>
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
