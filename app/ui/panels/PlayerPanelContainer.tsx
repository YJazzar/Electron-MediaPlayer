import React from 'react';
import playerControlsConfig from '../configs/PlayerControlsConfigImpl';

export default class PlayerPanelContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div className={`${playerControlsConfig.className} ${playerControlsConfig.cssClassStyles}`}>
                <h1>Player Panel</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Sapien eget mi proin sed libero enim sed faucibus.
                    Nisi est sit amet facilisis magna etiam tempor orci eu.
                    Pharetra convallis posuere morbi leo urna. Id nibh tortor id
                    aliquet lectus. Turpis egestas pretium aenean pharetra magna
                    ac. Aliquet lectus proin nibh nisl condimentum id venenatis
                    a condimentum. Molestie ac feugiat sed lectus vestibulum
                    mattis. Sit amet facilisis magna etiam tempor orci eu
                    lobortis. Libero justo laoreet sit amet cursus sit amet
                    dictum sit. At auctor urna nunc id cursus metus aliquam
                    eleifend. Nec ultrices dui sapien eget mi proin sed libero.
                    Tempor id eu nisl nunc mi ipsum faucibus vitae. Egestas dui
                    id ornare arcu odio ut. Sit amet aliquam id diam maecenas
                    ultricies.
                </p>
            </div>
        );
    }
}
