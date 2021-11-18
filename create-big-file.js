const fs = require('fs');
const file = fs.createWriteStream('./big.file');

for (let index = 0; index < 5e6; index++) {
    file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit')
    
}
file.end();