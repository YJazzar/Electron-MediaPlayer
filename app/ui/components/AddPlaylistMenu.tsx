import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, TextField } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import UIController from '../controllers/UIController';

// The parent div of this component
const ParentDiv = styled.div``;

// Used to set the transition of the dialog
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
    open: boolean;
    success: boolean;
    failure: boolean;
    error: boolean;
    openSnackBar: boolean;
}

export default class AddPlaylistMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        console.log('CONSTRUCTOR CALLED');

        this.state = {
            textInputValue: '',
            open: true,
            success: false,
            failure: false,
            error: false,
            openSnackBar: false,
        };
    }

    handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.setState({
            textInputValue: event.target.value,
        });
    }

    addPlaylist() {
        UIController.getInstance().addNewPlaylistSubmit(this.state.textInputValue);

        // Poss: 1. success 2- user cancels
        // this.closeDialog();
    }

    render() {
        return (
            <ParentDiv id="open-modal" className="modal-window">
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    onExited={this.props.onClose}
                    aria-labelledby="dialog-slide-title"
                    aria-describedby="dialog-slide-description"
                >
                    <DialogTitle id="dialog-slide-title">{title}</DialogTitle>
                    <DialogContent>
                        <TextField id="playlist-name-input" label="Playlist name:" onChange={this.handleChange.bind(this)} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.onClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={this.addPlaylist.bind(this)}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </ParentDiv>
        );
    }
}
