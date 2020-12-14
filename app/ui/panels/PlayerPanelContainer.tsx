import React from 'react';
import styled from 'styled-components';
import ApplicationState from '../../libs/templates/ApplicationState';
import playerControlsConfig from '../configs/PlayerControlsConfigImpl';
import UIController from '../controllers/UIController';
import PlayerSlider from '../components/PlayerSlider';
import PlayerControls from '../components/PlayerControls';

// const log = LoggerFactory.getUILogger(__filename);

const PlayerPanelDiv = styled(UIController.getInstance().getTheme())`
    border-top-width: 4px;
    border-radius: 0.25rem;
    /* flex-direction: row; */
    justify-content: center;
    align-items: center;
    padding: 2em;
    height: 100%;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    /* border: 3px solid green; */
    text-align: center;
`;

interface State {
    paused: boolean; // Used when a file is playing, but the user hit "pause"
}

export default class PlayerPanelContainer extends React.Component<ApplicationState, State> {
    private playerSliderRef: React.RefObject<PlayerSlider>;

    constructor(props: ApplicationState) {
        super(props);

        this.state = {
            paused: false,
        };

        this.playerSliderRef = React.createRef();
    }

    // Used by the VolumeSlider component to change the volume
    onVolumeChange(newVolume: number) {
        this.playerSliderRef.current?.setVolume(newVolume);
    }

    setPausedState(newState: boolean) {
        this.setState({
            paused: newState,
        });
    }

    togglePlay() {
        this.playerSliderRef.current?.togglePlay();
    }

    render() {
        return (
            <PlayerPanelDiv
                id={'PlayerPanelDiv'}
                className={`${playerControlsConfig.className} ${playerControlsConfig.cssClassStyles}`}
            >
                {this.getTitleRow()}
                {this.getPlayerRow()}
                {this.getControlsRow()}
            </PlayerPanelDiv>
        );
    }
    getTitleRow(): React.ReactChild {
        const TitleRow = styled(Row)`
            display: block;
        `;

        const title = this.props.playing === true ? this.props.currFilePlaying : 'Nothing playing yet';

        return <TitleRow>{title}</TitleRow>;
    }

    getPlayerRow(): React.ReactChild {
        return (
            <Row id={'PlayerSlider'}>
                <PlayerSlider
                    ref={this.playerSliderRef}
                    {...this.props} // Pass the application state down
                    {...this.state}
                    setPausedState={this.setPausedState.bind(this)}
                />
            </Row>
        );
    }

    getControlsRow(): React.ReactChild {
        return (
            <Row id={'Controls-row'}>
                <PlayerControls
                    togglePlay={this.togglePlay.bind(this)}
                    paused={this.state.paused}
                    {...this.props}
                    onVolumeChange={this.onVolumeChange.bind(this)}
                />
            </Row>
        );
    }
}
