console.log(require('./Rule'))
const { Rule } = require('./Rule');

class Core {
    constructor(){
        const listTest = [
            {
                abc: 123,
            }
        ]

        Rule.setListTest(listTest);
    }
}

exports.module = new Core();