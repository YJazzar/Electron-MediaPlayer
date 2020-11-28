import React, { SyntheticEvent } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ApplicationState from '../../libs/templates/ApplicationState';
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

    onTimeUpdate(event: SyntheticEvent<HTMLAudioElement, Event>) {
        console.log("Updating time");
        this.setState({
            currentTime: event.currentTarget.currentTime as number,
            duration: event.currentTarget.duration as number,
        });
    }

    play() {
        this.audioPlayerRef.current?.play();
    }

    pause() {
        this.audioPlayerRef.current?.pause();
    }

    render() {
        return (
            <div className={`${playerControlsConfig.className} ${playerControlsConfig.cssClassStyles}`}>
                <button onClick={this.play.bind(this)}>play</button>
                <br />
                <p>
                    {this.state.currentTime} / {this.state.duration}
                </p>
                <br />
                <button onClick={this.pause.bind(this)}> pause</button>

                <h1>Player Panel</h1>
                {this.props.playing && this.props.currFilePlaying != null && (
                    <div id="audio-player">
                        {/* <ReactAudioPlayer src={this.props.currFilePlaying} autoPlay controls /> */}
                        <audio
                            controls
                            autoPlay
                            src={this.props.currFilePlaying}
                            style={{ width: '100%' }}
                            ref={this.audioPlayerRef}
                            onTimeUpdate={this.onTimeUpdate.bind(this)}
                        >
                            Your browser does not support <code>audio</code> tag
                        </audio>
                    </div>
                )}
            </div>
        ); //  style={{ display: 'none' }}
    }
}
