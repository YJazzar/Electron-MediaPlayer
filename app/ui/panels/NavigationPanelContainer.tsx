import React from 'react';
import styled from 'styled-components';
import navConfig from '../configs/NavConfigImpl';
import UIController from '../controllers/UIController';
import ApplicationState from '../../libs/templates/ApplicationState';
import { Button, List, ListItem } from '@material-ui/core';
import AddPlaylistMenu from '../components/AddPlaylistMenu';

const NavPanelDiv = styled(UIController.getInstance().getTheme())`
    border-right-width: 4px;
    border-radius: 0.25rem;
`;

interface Props extends ApplicationState {
    changePlaylist: (newPlaylist: string) => void;
}

interface State {
    showAddPlaylistWindow: boolean;
}

export default class NavigationPanelContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showAddPlaylistWindow: false,
        };
    }

    // This click listener will be used to lift the state change to the root component
    // It will be invoked when a user changes the playlist that they want to access
    getClickListener(name: string): () => void {
        return () => this.props.changePlaylist(name);
    }

    getPlaylists(): React.ReactChild {
        const list: React.ReactChild[] = this.props.playlistNames.map((name) => {
            return (
                <ListItem button key={name} onClick={this.getClickListener(name).bind(this)}>
                    {name}
                </ListItem>
            );
        });

        return <List>{list}</List>;
    }

    cancelAddPlaylist() {
        this.setState({
            showAddPlaylistWindow: false,
        });
    }

    render() {
                return (
            <NavPanelDiv id={'NavPanelDiv'} className={navConfig.className + ' ' + navConfig.cssClassStyles}>
                <h1>Navigation Panel</h1>
                <Button onClick={(() => this.setState({ showAddPlaylistWindow: true })).bind(this)}>Add new Playlist</Button>
                <br />
                {this.getPlaylists()}

                {/* Show the "Import playlist menu if needed" */}
                {this.state.showAddPlaylistWindow ? <AddPlaylistMenu onClose={this.cancelAddPlaylist.bind(this)}/> : <div/>}
            </NavPanelDiv>
        );
    }
}
