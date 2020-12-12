import React from 'react';
import styled from 'styled-components';
import navConfig from '../configs/NavConfigImpl';
import UIController from '../controllers/UIController';
import AddPlaylistMenu from '../components/AddPlaylistMenu';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { IpcRendererEvent } from 'electron';

const ParentDiv = styled(UIController.getInstance().getTheme())``;

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {}

interface State {
    showAddPlaylistWindow: boolean;
    openSnackbar: boolean;
    snackBarSeverity: "success" | "error" | "warning" | "info" | undefined;
    snackbarMessage: string;
}

export default class DialogManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showAddPlaylistWindow: false,
            openSnackbar: false,
            snackBarSeverity: undefined,
            snackbarMessage: '',
        };


        UIController.getInstance().setAddPlaylistDisplay(this.showAddPlaylistWindow.bind(this));
        UIController.getInstance().setSnackbarCBs(
            this.openSuccessSnackbar.bind(this),
            this.openInfoSnackbar.bind(this),
            this.openErrorSnackbar.bind(this)
        );
    }

    cancelAddPlaylist() {
        this.setState({
            showAddPlaylistWindow: false,
            openSnackbar: true,
            snackBarSeverity: 'warning',
            snackbarMessage: 'The operation was cancelled',
        });

        console.log('CANCELELDEDED');
    }

    showAddPlaylistWindow() {
        this.setState({
            showAddPlaylistWindow: true,
            openSnackbar: false,
        });
    }

    openSuccessSnackbar(_e: IpcRendererEvent, message: string) {
        this.setState({
            showAddPlaylistWindow: false,
            openSnackbar: true,
            snackBarSeverity: 'success',
            snackbarMessage: message,
        });

    }

    openInfoSnackbar(_e: IpcRendererEvent, message: string) {
        this.setState({
            showAddPlaylistWindow: false,
            openSnackbar: true,
            snackBarSeverity: 'info',
            snackbarMessage: message,
        });

    }

    openErrorSnackbar(_e: IpcRendererEvent, message: string) {
        this.setState({
            showAddPlaylistWindow: false,
            openSnackbar: true,
            snackBarSeverity: 'error',
            snackbarMessage: message,
        });

    }

    closeSnackbar() {
        this.setState({
            openSnackbar: false,
        });
    }

    render() {
        if (this.state.openSnackbar) {
            return (
                <Snackbar open={this.state.openSnackbar} autoHideDuration={3000} onClose={this.closeSnackbar.bind(this)}>
                    <Alert severity={this.state.snackBarSeverity} onClose={this.closeSnackbar.bind(this)}>
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
            );
        }

        return (
            <ParentDiv id={'DialogManager'} className={navConfig.className + ' ' + navConfig.cssClassStyles}>
                {/* Show the "Import playlist menu if needed" */}
                {this.state.showAddPlaylistWindow ? <AddPlaylistMenu onClose={this.cancelAddPlaylist.bind(this)} /> : <div />}
            </ParentDiv>
        );
    }
}
