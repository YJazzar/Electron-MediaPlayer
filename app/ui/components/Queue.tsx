import React from 'react';
import styled from 'styled-components';
import ApplicationState from '../../libs/templates/ApplicationState';
import { List, ListItem, ListItemText, ListItemIcon, Box } from '@material-ui/core';
// import StarIcon from '@material-ui/icons/Star';

// The parent div of this component
const ParentDiv = styled(Box)``;

interface State {}

export default class Queue extends React.Component<ApplicationState, State> {
    constructor(props: ApplicationState) {
        super(props);

        this.state = {};
    }

    // TODO: skip to a track if a queue item was clicked
    getQueueList(): React.ReactChild {
        const list: React.ReactChild[] = this.props.queue.map((name) => {
            // Place a star in the item entry if it is playing:
            if (this.props.currFilePlaying === name) {
                return (
                    <ListItem dense button key={`queue.${name}`}>
                        {/* <ListItemIcon >
                            <StarIcon />
                        </ListItemIcon> */}
                        <ListItemText primary={`*${name}`} />
                    </ListItem>
                );
            }

            return (
                <ListItem dense button key={`queue.${name}`}>
                    <ListItemText primary={name} />
                </ListItem>
            );
        });

        return <List>{list}</List>;
    }

    render() {
        return (
            <ParentDiv id={'Queue-Panel'} borderTop={1} borderColor="primary.main">
                Queue:
                {this.getQueueList()}
            </ParentDiv>
        );
    }
}
