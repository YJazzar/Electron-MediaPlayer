import React, { SyntheticEvent } from 'react';
import ApplicationState from '../../libs/templates/ApplicationState';
import Slider from '../components/Slider';
import playerControlsConfig from '../configs/PlayerControlsConfigImpl';

interface State {
    currentTime: number;
    duration: number;
}

export default class PlayerPanelContainer extends React.Component<ApplicationState, State> {
    audioPlayerRef: React.RefObject<HTMLAudioElement>;

    constructor(props: ApplicationState) {
        super(props);

        this.state = {
            currentTime: 0,
            duration: 0,
        };

        this.audioPlayerRef = React.createRef();
    }

    // This will be passed to the <audio> tag so currTime can be updated regularly
    onTimeUpdate(event: SyntheticEvent<HTMLAudioElement, Event>) {
        console.log('Updating time');
        this.setState({
            currentTime: event.currentTarget.currentTime as number,
            duration: event.currentTarget.duration as number,
        });
    }

    // This will be passed to the <Slider> component so the user can drag the slider
    onSliderDrag(newTime: number) {
        this.setState({
            currentTime: newTime,
        });

        if (this.audioPlayerRef.current) {
            this.audioPlayerRef.current.currentTime = newTime;
        }
    }

    play() {
        this.audioPlayerRef.current?.play();
    }

    pause() {
        this.audioPlayerRef.current?.pause();
    }

    render() {
        // If something is playing, then load an audio tag and play the audio:
        if (this.props.currFilePlaying != null) {
            const duration = this.state.duration;

            return (
                <div className={`${playerControlsConfig.className} ${playerControlsConfig.cssClassStyles}`}>
                    <button onClick={this.play.bind(this)}>play</button>
                    <p>
                        {isNaN(duration) ? '-' : this.state.currentTime} / {isNaN(duration) ? '-' : duration}
                    </p>
                    <button onClick={this.pause.bind(this)}> pause</button>

                    <div id="audio-player">
                        <Slider
                            minValue={0}
                            maxValue={duration}
                            currValue={this.state.currentTime}
                            onSliderDrag={this.onSliderDrag.bind(this)}
                        />
                        <audio
                            autoPlay
                            src={this.props.currFilePlaying}
                            style={{ width: '100%' }}
                            ref={this.audioPlayerRef}
                            onTimeUpdate={this.onTimeUpdate.bind(this)}
                        >
                            An error ocurred when loading the <code>audio</code> tag!
                        </audio>
                    </div>
                </div>
            );
        }

        // If nothing is playing, then don't load an audio tag
        return (
            <div className={`${playerControlsConfig.className} ${playerControlsConfig.cssClassStyles}`}>
                <h4>Not playing</h4>
            </div>
        );
    }
}
