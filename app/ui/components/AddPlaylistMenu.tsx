import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, TextField } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import UIController from '../controllers/UIController';

// The parent div of this component
const ParentDiv = styled.div``;

// Used to set the transition of the diaglog
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const title: string = 'Add New Playlist:';

interface Props {
    onClose: () => void;
}

interface State {
    textInputValue: string;
}

export default class AddPlaylistMenu extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            textInputValue: '',
        };
    }

    handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.setState({
            textInputValue: event.target.value,
        });
    }

    addPlaylist() {
        UIController.getInstance().addNewPlaylist(this.state.textInputValue);
        this.props.onClose();
    }

    render() {
        console.log('SHOWING ADD PANEL');

        return (
            <ParentDiv id="open-modal" className="modal-window">
                <Dialog
                    open={true}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="dialog-slide-title"
                    aria-describedby="dialog-slide-description"
                >
                    <DialogTitle id="dialog-slide-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog-slide-description">
                            <TextField id="playlist-name-input" label="Playlist name:" onChange={this.handleChange.bind(this)}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.onClose}>Close</Button>
                        <Button color="primary" onClick={this.addPlaylist.bind(this)}>Add</Button>
                    </DialogActions>
                </Dialog>
            </ParentDiv>
        );
    }
}
