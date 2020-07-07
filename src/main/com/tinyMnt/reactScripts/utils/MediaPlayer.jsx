import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
const config = require("D:/Projects/tnyPlayer/config.js");

const Logger = require(config.htmlLoggerPath);

class ResponsivePlayer extends React.Component {
	constructor(props) {
		super(props);
		Logger.logInfo(__filename, "starting interval");
		this.interval = setInterval(this.accessChild.bind(this), 1000);
	}

	accessChild() {
		Logger.logInfo(__filename, "inside access chile");
		Logger.logInfo(__filename, "PRINTING FROM REFFSSS:: " + this.refs.reactPlayer.getCurrentTime());
	}

	render() {
		Logger.logVerbose(__filename, "Now playing: " + this.props.filePath);

		return (
			<div className='player-wrapper'>
				<ReactPlayer
					id='reactPlayer'
					ref='reactPlayer'
					// ref={this.ref}
					// url="C:/Users/sfjzz/Videos/2020-05-26 13-17-56.mkv" test file
					url={this.props.filePath}
					width='90%'
					height='80%'
					playing={true}
					controls={true}
					volume={0.5}
					onReady={() => console.log("onReady")}
					onStart={() => console.log("onStart")}
					onProgress={this.handleProgress}
				/>
			</div>
		);
	}
}

function	seekUpdater() {
		Logger.logDebug(__filename, "Running updater");
		// let rp = document.getElementById("reactPlayer");
		Logger.logDebug(__filename, this.reactRef);

		// Logger.logDebug(__filename, "Current time: " + rp.getCurrentTime());
	}

// This is called from TableEvents.js when a row is clicked
function run(filePath) {
	Logger.logDebug(
		__filename,
		"Rendering MediaPlayer at id=render-here. filePath=" + filePath
	);
	ReactDOM.render(
		<ResponsivePlayer filePath={filePath} />,
		document.getElementById("player-location")
	);
}

module.exports = { run };
