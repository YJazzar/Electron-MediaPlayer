import React from 'react';
import styled from 'styled-components';
import ApplicationState from '../../libs/templates/ApplicationState';
import { List, ListItem, ListItemText, ListItemIcon, Box } from '@material-ui/core';
import FileDetails from '../../libs/templates/FileDetails';
// import StarIcon from '@material-ui/icons/Star';

// The parent div of this component
const ParentDiv = styled(Box)``;

interface State {}

export default class Queue extends React.Component<ApplicationState, State> {
    constructor(props: ApplicationState) {
        super(props);

        this.state = {};
    }

    // Used to skip to a certain file from the queue
    clickListener(file: FileDetails): () => void {
        return () => {
            this.props.playFileCB(file);
        };
    }

    // TODO: skip to a track if a queue item was clicked
    getQueueList(): React.ReactChild {
        const list: React.ReactChild[] = this.props.queue.map((file: FileDetails) => {
            // Place a star in the item entry if it is playing:
            const name = file.fileName;
            const clickCB = this.clickListener(file).bind(this);
            if (this.props.currFilePlaying === file.filePath) {
                return (
                    <ListItem dense button key={`queue.${name}`} onClick={clickCB}>
                        {/* <ListItemIcon >
                            <StarIcon />
                        </ListItemIcon> */}
                        <ListItemText primary={`*${name}`} />
                    </ListItem>
                );
            }

            return (
                <ListItem dense button key={`queue.${name}`} onClick={clickCB}>
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
