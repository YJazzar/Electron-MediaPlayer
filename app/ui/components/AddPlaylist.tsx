import React from 'react';
import styled from 'styled-components';

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

const SubWindow2 = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    background: #fff;
    z-index: 1001;
`;

export default class AddPlaylist extends React.Component<{}, {}> {
    render() {
        console.log('SHOWING ADD PANEL');

        return (
            <ParentDiv id="open-modal" className="modal-window">
                <SubWindow>
                    <SubWindow2>
                        <a href="#modal-close" title="Close" className="modal-close">
                            close &times;
                        </a>
                        <h1>CSS Modal</h1>
                        <div>The quick brown fox jumped over the lazy dog.</div>
                    </SubWindow2>
                </SubWindow>
            </ParentDiv>
        );
    }
}
