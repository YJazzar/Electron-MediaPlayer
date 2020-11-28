import React, { SyntheticEvent } from 'react';

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
        this.props.onSliderDrag(event.currentTarget.value as unknown as number);
    }

    render() {
        return (
            <input
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
