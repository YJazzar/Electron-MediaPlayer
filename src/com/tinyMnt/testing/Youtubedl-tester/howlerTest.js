
const { Howl, Howler } = require('howler');

// var sound = new Howl({
//     src: ['sample.mp3']
// });


var sound = new Howl({
    src: ['sound.mp3']
});

// Clear listener after first call.
sound.once('load', function () {
    sound.play();
});

// Fires when the sound finishes playing.
sound.on('end', function () {
    console.log('Finished!');
});
Howler.volume(0.5);
sound.play();
// console.log('Played');