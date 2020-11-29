import React from 'react';
import styled from 'styled-components';
import navConfig from '../configs/NavConfigImpl';
import UIController from '../controllers/UIController';

const NavPanelDiv = styled(UIController.getInstance().getTheme())`

`;

export default class NavigationPanelContainer extends React.Component<{}, {}> {
    render() {
        return (
            <NavPanelDiv className={navConfig.className + ' ' + navConfig.cssClassStyles}>
                <h1>Navigation Panel</h1>
            </NavPanelDiv>
        );
    }
}
