const fs = require('fs');
// const server = require('http').createServer();
const express = require('express');
const app = express();
// server.on('request', (req, res) => {
//     fs.readFile('./big.file', (err, data) => {
//         if(err) throw err;

//         // res.end(data);
//         res.download(data);
//     });

//     // const object = {
//     //     index: 1,
//     //     test: "test"
//     // }

//     // const src = fs.createReadStream('./output.csv');
//     // const src = fs.createReadStream(object);
//     // src.pipe(res);
//     // res.download(src);
// })
app.get('/', (req, res) => {
    console.log('1111111111111')
    const src = fs.createReadStream('./output.csv');
    res.download('output.csv');
    // res.send('test');
})


app.listen(4000, () => console.log(`Example app listening at http://localhost:${4000}`))