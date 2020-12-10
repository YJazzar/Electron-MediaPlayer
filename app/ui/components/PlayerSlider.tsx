import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import React from 'react';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

const ParentDiv = styled.div`
    width: inherit;
    display: flex;
`;

const Button = styled(IconButton)`
    width: 5%;
    color: palevioletred;
    margin: auto;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    display: block;
    width: 10%;
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

// const AudioPlayerDiv = styled.div`
//     width: 70%;
//     display: flex;
//     justify-content: center;
//     align-items: 'center';
// `;


interface Props {
    // togglePlay: () => void;
    // onSliderDrag: (event: React.ChangeEvent<{}>, newTime: number | number[]) => void;
    // paused: boolean;
    playing: boolean;
    currFilePlaying: string | null;
}

interface State {
    currentTime: number;
    duration: number;   // This will be the max value of the slider (min value always = 0)
    paused: boolean;
}

export default class PlayerSlider extends React.Component<Props, State> {
    audioPlayerRef: React.RefObject<HTMLAudioElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentTime: 0,
            duration: 0,
            paused: false,
        };

        this.audioPlayerRef = React.createRef();
    }

    handleChange(event: SyntheticEvent<HTMLInputElement, Event>) {
        // this.props.onSliderDrag((event.currentTarget.value as unknown) as number);
    }

    togglePlay() {
        if (!this.props.playing) {
            // Return early here to avoid changing the component's state is something is not playing
            return;
        }

        if (this.state.paused === false) {
            this.audioPlayerRef.current?.pause();
            this.setState({
                paused: true,
            });
        } else if (this.state.paused === true) {
            this.audioPlayerRef.current?.play();
            this.setState({
                paused: false,
            });
        }
    }

     // This will be passed to the <Slider> component so the user can drag the slider
     onSliderDrag(event: React.ChangeEvent<{}>, newTime: number | number[]) {
        this.setState({
            currentTime: newTime as number,
        });

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


    render() {
        return (
            <ParentDiv id={'PlayerSlider'}>
                <Button onClick={this.togglePlay.bind(this)} color={'inherit'}>
                    {this.state.paused || !this.props.playing ? <PlayArrowIcon /> : <PauseIcon />}
                </Button>
                <StyledSlider min={0} max={this.state.duration} value={this.state.currentTime} aria-labelledby="continuous-slider" onChange={this.onSliderDrag.bind(this)} />
                <TimeStamp>
                    {isNaN(this.state.duration) ? '-' : Math.round(this.state.currentTime)} /{' '}
                    {isNaN(this.state.duration) ? '-' : Math.round(this.state.duration)}
                </TimeStamp>

                {this.getAudioPlayer()}
            </ParentDiv>
        );
    }

    getAudioPlayer(): React.ReactChild {
        if (this.props.currFilePlaying != null) {
            return (
                <audio
                    autoPlay
                    src={this.props.currFilePlaying}
                    style={{ width: '100%' }}
                    ref={this.audioPlayerRef}
                    onTimeUpdate={this.onTimeUpdate.bind(this)}
                >
                    An error ocurred when loading the <code>audio</code> tag!
                </audio>
            );
        }
        return <div id={'NoAudioPlaying'} />;
    }
}
