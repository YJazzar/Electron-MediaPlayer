import React from 'react';
import styled from 'styled-components';
import navConfig from '../configs/NavConfigImpl';
import UIController from '../controllers/UIController';
import ApplicationState from '../../libs/templates/ApplicationState';

const NavPanelDiv = styled(UIController.getInstance().getTheme())`
    border-right-width: 4px;
    border-radius: 0.25rem;
`;

export default class NavigationPanelContainer extends React.Component<ApplicationState, {}> {
	render() {
		return (
			<NavPanelDiv className={navConfig.className + ' ' + navConfig.cssClassStyles}>
				<h1>Navigation Panel</h1>
                <br/>
				{this.props.playlistNames.join(' <br/> ')}
			</NavPanelDiv>
		);
	}
}
