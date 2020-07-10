import React from "react";

const config = require("D:/Projects/tnyPlayer/config.js");
const Seeker = require(config.buildPath + config.reactSourcePath + "playerPanel/Seeker.js");
// const Logger = require(config.htmlLoggerPath);


class PlayerPanel extends React.Component {
	render() {
		return (
			<div id='player_container'>
				<link
					rel='stylesheet'
					href={
						config.buildPath +
						config.cssSourcePath +
						"playerPanel.css"
					}
				/>

				<div id='player-location'></div>
				
				<Seeker />
			</div>
		);
	}
}

module.exports = PlayerPanel;
