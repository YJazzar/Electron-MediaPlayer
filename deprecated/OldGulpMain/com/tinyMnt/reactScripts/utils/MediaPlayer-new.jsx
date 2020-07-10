// import React from "react";
// import ReactDOM from "react-dom";
// import ReactPlayer from "react-player";
// const config = require("D:/Projects/tnyPlayer/config.js");

// const Logger = require(config.htmlLoggerPath);

// class ResponsivePlayer extends React.Component {
// 	state = {
// 		url: null,
// 		pip: false,
// 		playing: true,
// 		controls: false,
// 		light: false,
// 		volume: 0.8,
// 		muted: false,
// 		played: 0,
// 		loaded: 0,
// 		duration: 0,
// 		playbackRate: 1.0,
// 		loop: false,
// 	};

// 	load = (url) => {
// 		this.setState({
// 			url,
// 			played: 0,
// 			loaded: 0,
// 			pip: false,
// 		});
// 	};

// 	render() {
// 		Logger.logVerbose(__filename, "Now playing: " + this.props.filePath);

// 		return (
// 			<div className='player-wrapper'>
// 				<ReactPlayer
// 					id='reactPlayer'
// 					ref={this.ref}
// 					// url="C:/Users/sfjzz/Videos/2020-05-26 13-17-56.mkv" test file
// 					url={this.props.filePath}
// 					width='90%'
// 					height='80%'
// 					playing={true}
// 					controls={true}
// 					volume={0.5}
// 					onReady={() => console.log("onReady")}
// 					onStart={() => console.log("onStart")}
// 					onProgress={this.handleProgress}
// 				/>
// 			</div>
// 		);
// 	}
// }

// // This is called from TableEvents.js when a row is clicked
// function run(filePath) {
// 	Logger.logDebug(
// 		__filename,
// 		"Rendering MediaPlayer at id=render-here. filePath=" + filePath
// 	);
// 	ReactDOM.render(
// 		<ResponsivePlayer filePath={filePath} />,
// 		document.getElementById("player-location")
// 	);
// }

// module.exports = { run };
