import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, TextField, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
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

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

        UIController.getInstance().setAddPlaylistResultsCBs(
            this.onSuccess.bind(this),
            this.onFailure.bind(this),
            this.onError.bind(this)
        );
    }

    onSuccess() {
        this.setState({
            success: true,
            openSnackBar: true,
        });
        this.closeDialog();
    }

    onFailure() {
        this.setState({
            failure: true,
            openSnackBar: true,
        });
        // this.closeDialog();
    }

    onError() {}

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

    closeDialog() {
        this.setState({
            open: false,
        });
    }

    closeSnackbar() {
        this.setState({
            openSnackBar: false,
        });
        this.closeDialog();
    }

    render() {
        if (this.state.openSnackBar && this.state.success) {
            return (
                <Snackbar open={this.state.openSnackBar} autoHideDuration={3000} onClose={this.closeSnackbar.bind(this)}>
                    <Alert severity="success" onClose={this.closeSnackbar.bind(this)}>
                        Playlist added successfully!
                    </Alert>
                </Snackbar>
            );
        }

        if (this.state.openSnackBar && this.state.failure) {
            return (
                <Snackbar open={this.state.openSnackBar} autoHideDuration={3000} onClose={this.closeSnackbar.bind(this)}>
                    <Alert severity="info" onClose={this.closeSnackbar.bind(this)}>
                        Operation was canceled
                    </Alert>
                </Snackbar>
            );
        }

        if (this.state.openSnackBar && this.state.error) {
            return (
                <Snackbar open={this.state.openSnackBar} autoHideDuration={3000} onClose={this.closeSnackbar.bind(this)}>
                    <Alert severity="error" onClose={this.closeSnackbar.bind(this)}>
                        An error has occurred!
                    </Alert>
                </Snackbar>
            );
        }

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
                        <Button color="primary" onClick={this.onFailure.bind(this)}>
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
