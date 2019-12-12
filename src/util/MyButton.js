//react component
import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default({ children, tip, onClick }) => ({
    render() {
        return (
            <Tooltip title={tip}>
                <IconButton onClick={onClick}>
                    {children}
                </IconButton>
            </Tooltip>
        )
    }
})
