const fs = require('fs');
const readline = require('readline');

const getFileColumns = async (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        rl.close();
        return line.split(',').map(col => col.trim());
    }
};

module.exports = {
    getFileColumns,
};
