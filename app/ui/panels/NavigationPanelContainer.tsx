import React from 'react';
import styled from 'styled-components';
import navConfig from '../configs/NavConfigImpl';
import UIController from '../controllers/UIController';
import ApplicationState from '../../libs/templates/ApplicationState';


const NavPanelDiv = styled(UIController.getInstance().getTheme())`
    border-right-width: 4px;
    border-radius: 0.25rem;
`;

interface Props extends ApplicationState {
    changePlaylist: (newPlaylist: string) => void
}

export default class NavigationPanelContainer extends React.Component<Props, {}> {
    // This click listener will be used to lift the state change to the root component
    // It will be invoked when a user changes the playlist that they want to access
    getClickListener(name: string): () => void {
		return () => this.props.changePlaylist(name);
	}

    getPlaylists(): React.ReactChild {
        console.log('CALLEEDDD');
		const list: React.ReactChild[] = this.props.playlistNames.map((name) => {
			return <li key={name} onClick={(this.getClickListener(name)).bind(this)}>{name}</li>;
		});

		return (
            <ol>
                {list}
            </ol>
        );
	}

	render() {
		return (
			<NavPanelDiv className={navConfig.className + ' ' + navConfig.cssClassStyles}>
				<h1>Navigation Panel</h1>
				<br />
				{this.getPlaylists()}
			</NavPanelDiv>
		);
	}
}
