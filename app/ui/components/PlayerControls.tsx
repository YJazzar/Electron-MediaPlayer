import React from 'react';
import styled from 'styled-components';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { Button } from '@material-ui/core';
import VolumeSlider from '../components/VolumeSlider';
import ApplicationState from '../../libs/templates/ApplicationState';

// import StarIcon from '@material-ui/icons/Star';

// The parent div of this component
const ParentDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    /* border: 3px solid green; */
    text-align: center;
`;

const Column = styled.div`
    display: flex;
    width: 33%;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    /* border: 3px solid green; */
    text-align: center;
`;


interface Props extends ApplicationState {
    togglePlay: () => void;
    onVolumeChange: (newVolume: number) => void;
    paused: boolean;
}

export default class PlayerControls extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <ParentDiv id={'Player-Controls-Panel'}>
                <Column></Column>
                <Column>
                    <Button>
                        <SkipPreviousIcon />
                    </Button>

                    <Button onClick={this.props.togglePlay} color={'primary'} variant="text">
                        {this.props.paused || !this.props.playing ? <PlayArrowIcon /> : <PauseIcon />}
                    </Button>

                    <Button>
                        <SkipNextIcon />
                    </Button>
                </Column>
                <Column>
                    <VolumeSlider onVolumeChange={this.props.onVolumeChange} />
                </Column>
            </ParentDiv>
        );
    }
}
