import React from 'react';
import styled from 'styled-components';
import navConfig from '../configs/NavConfigImpl';
import UIController from '../controllers/UIController';
import AddPlaylistMenu from '../components/AddPlaylistMenu';

const ParentDiv = styled(UIController.getInstance().getTheme())``;

interface Props {}

interface State {
    showAddPlaylistWindow: boolean;
}

export default class DialogManager extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showAddPlaylistWindow: false,
        };

        UIController.getInstance().setAddPlaylistDisplay(this.showAddPlaylistWindow.bind(this));
    }

    cancelAddPlaylist() {
        this.setState({
            showAddPlaylistWindow: false,
        });
    }

    showAddPlaylistWindow() {
        this.setState({
            showAddPlaylistWindow: true,
        });
    }

    render() {
        return (
            <ParentDiv id={'DialogManager'} className={navConfig.className + ' ' + navConfig.cssClassStyles}>
                {/* Show the "Import playlist menu if needed" */}
                {this.state.showAddPlaylistWindow ? <AddPlaylistMenu onClose={this.cancelAddPlaylist.bind(this)} /> : <div />}
            </ParentDiv>
        );
    }
}
