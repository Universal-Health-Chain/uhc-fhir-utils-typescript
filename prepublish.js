const ncp = require('ncp').ncp;
const { execSync } = require('child_process');
const path = require('path');

const source = path.resolve(__dirname, 'terminology');
const destination = path.resolve(__dirname, 'lib/terminology');

ncp(source, destination, function (err) {
    if (err) {
        return console.error("Error during copy:", err);
    }
    
    console.log("Copying done. Now processing...");

    // Process the JSON files in the copied directory.
    execSync(`node processJson.js "${destination}"`, { cwd: __dirname });
    console.log('Finished copying and processing files. Please review the logs.');
});