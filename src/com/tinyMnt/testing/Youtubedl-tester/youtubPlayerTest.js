const fs = require('fs');
const youtubedl = require('youtube-dl');

const video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
    // Optional arguments passed to youtube-dl.
    [],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname })

// const url = 'http://www.youtube.com/watch?v=WKsjaOqDXgg'

// youtubedl.getInfo(url, function (err, info) {
//     if (err) throw err

//     console.log('id:', info.id)
//     console.log('title:', info.title)
//     console.log('url:', info.url)
//     console.log('thumbnail:', info.thumbnail)
//     console.log('description:', info.description)
//     console.log('filename:', info._filename)
//     console.log('format id:', info.format_id)
// });

// Will be called when the download starts.
video.on('info', function (info) {
    console.log('Download started')
    console.log('filename: ' + info._filename)
    console.log('size: ' + info.size)
})

video.pipe(fs.createWriteStream('myvideo.mp4'));


