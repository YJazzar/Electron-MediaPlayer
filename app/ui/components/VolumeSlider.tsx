import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import React from 'react';
import styled from 'styled-components';

const ParentDiv = styled.div`
    width: 100%;
    display: flex;
    padding-left: 2em;
    padding-right: 2em;
`;

const StyledVolumeUp = styled(VolumeUp)`
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1em;
`;

const StyledSlider = styled(Slider)`
    margin-top: auto;
    margin-bottom: auto;
`;

const StyledVolumeDown = styled(VolumeDown)`
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 1em;
`;

interface Props {
    onVolumeChange: (newVolume: number) => void;
}

interface State {
    currVolume: number;
}

export default class VolumeSlider extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currVolume: 50,
        };
    }

    // This will be passed to the <Slider> component so the user can drag the slider
    onSliderDrag(_event: React.ChangeEvent<{}>, newVolume: number | number[]) {
        // Change the state accordingly
        this.setState({
            currVolume: newVolume as number,
        });

        // Lift up the state change so it can reach the PlayerSlider component
        this.props.onVolumeChange(this.state.currVolume);
    }

    render() {
        return (
            <ParentDiv className={'VolumeSlider'}>
                <StyledVolumeDown />
                <StyledSlider
                    min={0}
                    max={100}
                    value={this.state.currVolume}
                    aria-labelledby="continuous-slider"
                    onChange={this.onSliderDrag.bind(this)}
                    valueLabelDisplay="auto"
                />
                <StyledVolumeUp />
            </ParentDiv>
        );
    }
}
