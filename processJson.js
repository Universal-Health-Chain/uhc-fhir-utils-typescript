const fs = require('fs');
const path = require('path');

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);

        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.json')) {
            try {
                console.log("Processing:", fullPath);  // This will print each file before it's processed.
                const jsonData = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
            } catch (err) {
                console.error("Error processing file:", fullPath, err.message);
            }
            console.log("Processed:", fullPath);  // This will print each file that's processed.            
        }
  
    }
}

const directoryPath = process.argv[2];
if (directoryPath) {
    processDirectory(path.resolve(directoryPath));
} else {
    console.error("Please provide a directory path to process.");
    process.exit(1);
}
