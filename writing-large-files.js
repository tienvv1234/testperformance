const fs = require('fs');
const csv = require('csv-parser')
const writeStream = fs.createWriteStream('someFile.txt', { flags: 'w' });
// const readStream = new MyReadStream();

// readStream.pipe(writeStream);
// writeStream.on('close', function () {
//     console.log('All done!');
// });

const isLoop = true;
let i = 0;
// while (isLoop) {
//     const object = [
//         {
//             index: i++,
//             test: "test"
//         }
//     ]
//     writeToCSVFile(object);
// }

const object = [
    {
        index: i++,
        test: "test"
    }
]
writeToCSVFile(object);

function writeToCSVFile(users) {
    const filename = 'output.csv';
    fs.writeFile(filename, extractAsCSV(users), err => {
      if (err) {
        console.log('Error writing to csv file', err);
      } else {
        console.log(`saved as ${filename}`);
      }
    });
}

function extractAsCSV(users) {
    const header = ["index, test"];
    const rows = users.map(user =>
        `${user.index}, ${user.test}`
    );
    return header.concat(rows).join("\n");
}