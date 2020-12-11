import React from 'react';
import styled from 'styled-components';
import { Paper, IconButton, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// The parent div of this component
const ParentDiv = styled.div`
    /* Grays out the screen */
    display: table;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(200, 200, 200, 0.75);
    top: 0;
    left: 0;
    z-index: 999;
    opacity: 1;
    transition: all 0.3s;
`;

// Stylize the sub-window that will show up on the screen
const SubWindow = styled.div`
    display: table-cell;
    vertical-align: middle;
    height: 400px;
    z-index: 1000;
`;

const SubWindow2 = styled(Paper)`
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    z-index: 1001;
    padding: 0.75em;
`;

// For the "Close" Button
// const ControlBar = styled(IconButton)`
//     margin-bottom: 0.5em;
// `;
const StyledAppBar = styled(AppBar)`
    margin-bottom: 1em;
`;

const StyledToolbar = styled(Toolbar)`
    display: flex;
    flex-direction: row;
    flex-basis: 0%;
    margin-top: auto;
    margin-bottom: auto;
`;

const LeftAlign = styled.div`
    position: absolute;
    margin-top: auto;
    right: 1em;
`;

const CenterAlign = styled.div`
    /* position: absolute;
    margin-left: auto;
    margin-right: auto; */
    text-align: center;
`;

interface Props {
    contents: React.ReactChild | React.ReactChild[];
    title: string;
}

export default class PopUpPanel extends React.Component<Props, {}> {
    getAppBar() {
        return (
            <StyledAppBar position="static">
                <StyledToolbar>
                    <CenterAlign>
                        {this.props.title}
                    </CenterAlign>

                    <LeftAlign>
                        <IconButton edge="end">
                            <CloseIcon />
                        </IconButton>
                    </LeftAlign>
                </StyledToolbar>
            </StyledAppBar>
        );
    }

    render() {
        console.log('SHOWING ADD PANEL');

        return (
            <ParentDiv id="open-modal" className="modal-window">
                <SubWindow>
                    <SubWindow2 elevation={3}>
                        {this.getAppBar()}
                        {this.props.contents}
                    </SubWindow2>
                </SubWindow>
            </ParentDiv>
        );
    }
}
