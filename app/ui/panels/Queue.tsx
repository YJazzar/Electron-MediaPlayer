import React from 'react';
import styled from 'styled-components';
import ApplicationState from '../../libs/templates/ApplicationState';
import { List, ListItem, ListItemText, Box, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FileDetails from '../../libs/templates/FileDetails';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import LayersClearIcon from '@material-ui/icons/LayersClear';
import BlockIcon from '@material-ui/icons/Block';
import LoopIcon from '@material-ui/icons/Loop';

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

    // TODO: https://material-ui.com/components/accordion/
    getQueueList(): React.ReactChild {
        const list: React.ReactChild[] = this.props.queue.map((file: FileDetails) => {
            // Place a star in the item entry if it is playing:
            const name = `${file.fileName}`;
            const clickCB = this.clickListener(file).bind(this);

            if (this.props.currQueueIndex !== -1 && this.props.queue[this.props.currQueueIndex].filePath === file.filePath) {
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
                Queue Panel:
                <br />
                <Tooltip title="Clear Queue">
                    <IconButton onClick={this.props.clearQueue}>
                        <ClearAllIcon fontSize={'small'} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove Played">
                    <IconButton onClick={this.props.clearPlayed}>
                        <LayersClearIcon fontSize={'small'} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Disable Queue">
                    <IconButton onClick={this.props.toggleQueue}>
                        <BlockIcon fontSize={'small'} color={this.props.queueEnabled ? 'primary' : 'secondary'} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Loop Queue">
                    <IconButton onClick={this.props.toggleQueueLoop}>
                        <LoopIcon fontSize={'small'} color={this.props.queueLoopEnabled ? 'primary' : 'secondary'} />
                    </IconButton>
                </Tooltip>
                {this.getQueueList()}
            </ParentDiv>
        );
    }
}
