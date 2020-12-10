import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import React from 'react';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

const ParentDiv = styled.div`
    width: 65%;
`;

interface Props {
    // minValue: number;
    // maxValue: number;
    // currValue: number;
    // onSliderDrag: (newTime: number) => void;
}

export default class VolumeSlider extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    handleChange(event: SyntheticEvent<HTMLInputElement, Event>) {
        // this.props.onSliderDrag((event.currentTarget.value as unknown) as number);
    }

    render() {
        return (
            <ParentDiv className={'VolumeSlider'}>
                <Typography id="continuous-slider" gutterBottom>
                    {/* Volume */}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider value={50} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </Grid>
            </ParentDiv>
        );
    }
}
