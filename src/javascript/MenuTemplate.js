






function getMenuTemplate(app, win) {
    // Create a menu template
    // The menu is just an array of objects
    const mainMenuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open New Folder',
                    click() {
                        // Call function
                        console.log("Need to open a new folder");
                        win.webContents.send("tableFile:clearAndLoadItems");
                    }
                },
                {
                    label: 'Add Folder',
                    click() {
                        // Call function
                        console.log("Need to add folder");
                        win.webContents.send("tableFile:appendItems");
                    }
                },
                {
                    label: 'Clear Items',
                    click() {
                        console.log('Clear Items called');
                        win.webContents.send("tableFile:clearItems");
                    }
                },
                {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ]; // End of making the menu object

    // If the current system is a mac, then add an empty object to the beginning of the 
    // mainMenuTemplate array. 
    if (process.platform == 'darwin')
        mainMenuTemplate.unshift({});

    return mainMenuTemplate;
}


module.exports = { getMenuTemplate };