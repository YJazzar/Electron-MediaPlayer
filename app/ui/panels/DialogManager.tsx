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
    snackbars: SnackbarParams[];
}

interface SnackbarParams {
    openSnackbar: boolean;
    snackBarSeverity: 'success' | 'error' | 'warning' | 'info' | undefined;
    snackbarMessage: string;
    index: number;
}

export default class DialogManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showAddPlaylistWindow: false,
            snackbars: [],
        };

        UIController.getInstance().setAddPlaylistDisplay(this.showAddPlaylistWindow.bind(this), this.hideAddPlaylist.bind(this));
        UIController.getInstance().setSnackbarCBs(
            this.openSuccessSnackbar.bind(this),
            this.openInfoSnackbar.bind(this),
            this.openErrorSnackbar.bind(this)
        );
    }

    hideAddPlaylist() {
        console.log('HIDE RECE');
        this.setState({
            showAddPlaylistWindow: false,
        });
    }

    showAddPlaylistWindow() {
        this.setState({
            showAddPlaylistWindow: true,
        });
    }

    openSuccessSnackbar(_e: IpcRendererEvent, message: string) {
        this.addSnackbar('success', message);
    }

    openInfoSnackbar(_e: IpcRendererEvent, message: string) {
        this.addSnackbar('info', message);
    }

    openErrorSnackbar(_e: IpcRendererEvent, message: string) {
        this.addSnackbar('error', message);
    }

    openWarningSnackbar(_e: IpcRendererEvent, message: string) {
        this.addSnackbar('warning', message);
    }

    addSnackbar(severity: 'success' | 'error' | 'warning' | 'info' | undefined, message: string) {
        const newIndex = this.state.snackbars.length === 0 ? 0 : this.state.snackbars[this.state.snackbars.length - 1].index + 1;

        const newSnackbar: SnackbarParams = {
            openSnackbar: true,
            snackBarSeverity: severity,
            snackbarMessage: message,
            index: newIndex,
        };

        this.setState({
            snackbars: [...this.state.snackbars, newSnackbar],
        });

        console.log(`Severity: ${severity}\tmessage: ${message}\nlength: ${this.state.snackbars.length}`);
    }

    getCloseSnackbarCB(index: number): () => void {
        return () => {
            let newSnackbars = [...this.state.snackbars];
            newSnackbars = newSnackbars.filter((element: SnackbarParams) => {
                if (element.index === index) {
                    element.openSnackbar = false;
                    return false;
                } else {
                    return true;
                }
            });

            this.setState({
                snackbars: newSnackbars,
            });
        };
    }

    render() {
        const snackbars: React.ReactChild[] = this.state.snackbars.map((instance: SnackbarParams) => {
            return (
                <Snackbar
                    open={instance.openSnackbar}
                    autoHideDuration={3000}
                    onClose={this.getCloseSnackbarCB(instance.index).bind(this)}
                    key={instance.index}
                >
                    <Alert severity={instance.snackBarSeverity} onClose={this.getCloseSnackbarCB(instance.index).bind(this)}>
                        {instance.snackbarMessage}
                    </Alert>
                </Snackbar>
            );
        });

        return (
            <ParentDiv id={'DialogManager'} className={navConfig.className + ' ' + navConfig.cssClassStyles}>
                {/* Show the "Import playlist menu if needed" */}
                {this.state.showAddPlaylistWindow ? (
                    <AddPlaylistMenu addSnackbar={this.addSnackbar.bind(this)} onClose={this.hideAddPlaylist.bind(this)} />
                ) : (
                    <div />
                )}
                {snackbars}
            </ParentDiv>
        );
    }
}
