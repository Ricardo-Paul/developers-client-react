import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Project from '../components/Project';
import Profile from '../components/Profile'

import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export class home extends Component {

    state = {
        projects: null
    }

    componentDidMount(){
        axios.get('/projects')
            .then( res => {
                console.log(res.data)
                this.setState({
                    projects: res.data
                })
            })
            .catch( err => console.log(err));
    }

    render() {
        
        let projects = this.state.projects ? this.state.projects.map(project => <Project project={project} key={project.projectId} />) : this.state.projects

        let projectsMarkup = this.state.projects ? (projects) : (<p>loading...</p>)
        
        return (
            <div>
               <Typography variant="h4" color="secondary"> PROJECTS </Typography>
               <Grid container spacing={8}>
                   <Grid item sm={8} xs={12}>
                       <p>PROJECTS</p>
                       {projectsMarkup}
                   </Grid>
                   <Grid item sm={4} xs={12}>
                    <Profile />
                   </Grid>
               </Grid>
            </div>
        )
    }
}

export default home
//