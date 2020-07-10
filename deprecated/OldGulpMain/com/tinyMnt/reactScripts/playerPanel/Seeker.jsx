import React from "react";
import { remote } from "electron";

const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

class Seeker extends React.Component {
	render() {
        Logger.logDebug(__filename, remote.getCurrentWindow().getSize());
		return (
			<div id='seeker_container'>
				<svg width='100%' height='100%'>
					<rect id='seek-bar-full-width' width='100%' height='10' />
					<rect id='seek-bar-played-width' width='90%' height='10' />
				</svg>
			</div>
		);
	}
}

module.exports = Seeker;
