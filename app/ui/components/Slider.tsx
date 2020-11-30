import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

// The place I styled the range input from:
//  https://www.cssportal.com/style-input-range/



const StyledInput = styled.input`
    height: 17px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
    background: inherit;
    overflow: hidden;

    &:focus {
        outline: none;
    }
    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        background: #0084dd;
        border-radius: 50px;
    }
    &::-webkit-slider-thumb {
        border: 1px solid #4cad80;
        height: 10px;
        width: 16px;
        background: #4cad80;
        cursor: pointer;
        border-radius: 50px;
        -webkit-appearance: none;
        margin-top: -2px;
    }
    &:focus::-webkit-slider-runnable-track {
        background: #2497e3;
    }
`;

interface Props {
    minValue: number;
    maxValue: number;
    currValue: number;
    onSliderDrag: (newTime: number) => void;
}

export default class Slider extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    handleChange(event: SyntheticEvent<HTMLInputElement, Event>) {
        this.props.onSliderDrag((event.currentTarget.value as unknown) as number);
    }

    render() {
        return (
            <StyledInput
                type="range"
                min={this.props.minValue}
                max={isNaN(this.props.maxValue) ? '-' : this.props.maxValue}
                value={this.props.currValue}
                onChange={this.handleChange.bind(this)}
                className="slider"
                id="myRange"
            />
        );
    }
}
