import Slider from '@material-ui/core/Slider';
import React from 'react';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import ApplicationState from '../../libs/templates/ApplicationState';

const ParentDiv = styled.div`
    width: inherit;
    display: flex;
`;

const Button = styled(IconButton)`
    width: 5%;
    margin: auto;
    font-size: 1em;
    padding: 0.25em 0.25em;
    border-radius: 3px;
    display: block;
    &:focus {
        outline: none;
    }
`;

const StyledSlider = styled(Slider)`
    margin-top: auto;
    margin-bottom: auto;
`;

const TimeStamp = styled.div`
    width: 10%;
    display: inline-block;
    margin: auto;
    justify-content: center;
    align-items: left;
    vertical-align: baseline;
`;

interface Props extends ApplicationState {
    paused: boolean;
    setPausedState: (newPausedState: boolean) => void;
}

interface State {
    currentTime: number;
    duration: number; // This will be the max value of the slider (min value always = 0)
}

export default class PlayerSlider extends React.Component<Props, State> {
    audioPlayerRef: React.RefObject<HTMLAudioElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentTime: 0,
            duration: 0,
        };

        this.togglePlay = this.togglePlay.bind(this);

        this.audioPlayerRef = React.createRef();
    }

    togglePlay() {
        if (!this.props.playing) {
            // Return early here to avoid changing the component's state is something is not playing
            return;
        }

        if (this.props.paused === false) {
            this.audioPlayerRef.current?.pause();
            this.props.setPausedState(true);
        } else if (this.props.paused === true) {
            this.audioPlayerRef.current?.play();
            this.props.setPausedState(false);
        }
    }

    // This will be passed to the <Slider> component so the user can drag the slider
    onSliderDrag(_event: React.ChangeEvent<{}>, newTime: number | number[]) {
        this.setState({
            currentTime: newTime as number,
        });

        // Change the player's current time
        if (this.audioPlayerRef.current) {
            this.audioPlayerRef.current.currentTime = newTime as number;
        }
    }

    // This will be passed to the <audio> tag so currTime can be updated regularly
    onTimeUpdate(event: SyntheticEvent<HTMLAudioElement, Event>) {
        this.setState({
            currentTime: event.currentTarget.currentTime as number,
            duration: event.currentTarget.duration as number,
        });
    }

    // Note: newVolume will be in the range of [0, 100]
    setVolume(newVolume: number) {
        // Change the volume range from [0, 100] to [0, 1]
        newVolume = newVolume / 100.0;

        // Change the players volume
        if (this.audioPlayerRef.current) {
            this.audioPlayerRef.current.volume = newVolume;
        }
    }

    render() {
        return (
            <ParentDiv id={'PlayerSlider'}>
                <TimeStamp>{isNaN(this.state.duration) ? '-' : Math.round(this.state.currentTime)}</TimeStamp>
                <StyledSlider
                    min={0}
                    max={this.state.duration}
                    value={this.state.currentTime}
                    aria-labelledby="continuous-slider"
                    onChange={this.onSliderDrag.bind(this)}
                />
                <TimeStamp>{isNaN(this.state.duration) ? '-' : Math.round(this.state.duration)}</TimeStamp>

                {this.getAudioPlayer()}
            </ParentDiv>
        );
    }

    getAudioPlayer(): React.ReactChild {
        return (
            <audio
                autoPlay
                src={this.props.currFilePlaying != null ? this.props.currFilePlaying : ''}
                style={{ width: '100%' }}
                ref={this.audioPlayerRef}
                onTimeUpdate={this.onTimeUpdate.bind(this)}
                onEnded={this.props.playNextQueue}
            >
                An error ocurred when loading the <code>audio</code> tag!
            </audio>
        );
    }
}
