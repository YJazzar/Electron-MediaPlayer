// @param id: the id of the tag that must be substituted with HTML code written from another file.
// @param fileName: the file path of the external HTML code.
function includeHTML(id) {
    let element = document.getElementById(id);
    let fileName = element.getAttribute('file');
    let scriptFileName = element.getAttribute('script');

    let fs = require('fs');
    let data = "";
    let readStream = fs.createReadStream(fileName, 'utf8');

    readStream.on('data', function(res) {
        data += res;
    }).on('end', function() {
        element.innerHTML = data;
        // console.log(data); // Use to print out the data read in
        console.log("Successfully loaded the file: " + fileName);


        if (scriptFileName) {
            let {run} = require(scriptFileName);
            console.log('attempting to run the file: ' + scriptFileName);
            console.dir(run.toString());
            // run();
        } else {
            console.log('Skipping script run');
        }
    });

  

    /* Make an HTTP request using the attribute value as the file name: */
    // xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4) {
    //         if (this.status == 200) {
    //             element.innerHTML = this.responseText;
    //             console.log(this.responseText);
    //         }
    //         if (this.status == 404)
    //             element.innerHTML = "Page not found.";
    //     }
    // }
    // xhttp.open("GET", element.getAttribute(fileAttribute), true);
    // xhttp.send();
}

module.exports = { includeHTML };