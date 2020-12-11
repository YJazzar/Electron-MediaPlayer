import React from 'react';
import styled from 'styled-components';

// The parent div of this component
const ParentDiv = styled.div``;

export default class AddPlaylist extends React.Component<{}, {}> {
    render() {
        console.log('SHOWING ADD PANEL');

        return (
            <ParentDiv id="open-modal" className="modal-window">
                The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in culpa qui officia deserunt mollit anim id est laborum."
            </ParentDiv>
        );
    }
}
