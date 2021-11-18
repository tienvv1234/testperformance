const fs = require('fs');
const file = fs.createWriteStream('./big.file');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({ headers: ["index", "test"]})
let object = [];
// writer.write();
const filename = 'output.csv';
writer.pipe(fs.createWriteStream(filename, {flags: 'a'}))
for (let index = 0; index < 10000000; index++) {
    // if(index === 1) {
    //     writer = csvWriter({sendHeaders: false});
    // }
    // if(object.length === 1000)
    // {
    //     console.log('1111111111');
    //     // writeToCSVFile(object);
    //     // writer = csvWriter({sendHeaders: false});
    //     writer.pipe(fs.createWriteStream(filename, {flags: 'a'}))
    //     writer.write(object);
    //     object = [];
    // }
    // object.push({
    //     index: index,
    //     test: "test"
    // })
    // writeToCSVFile(object);
    // writer = csvWriter({sendHeaders: false});
    writer.write({
        index: index,
        test: "test"
    });
    // console.log(index);
}
writer.end()
file.end();


function writeToCSVFile(users) {
    const filename = 'output.csv';
    writer.pipe(fs.createWriteStream(filename)) 
    writer.write(extractAsCSV(users))
    // fs.writeFile(filename, extractAsCSV(users), err => {
    //   if (err) {
    //     console.log('Error writing to csv file', err);
    //   } else {
    //     console.log(`saved as ${filename}`);
    //   }
    // });
}

function extractAsCSV(users) {
    const rows = users.map(user =>
        `${user.index}, ${user.test}`
    );
    return rows.join("\n");
}