const storage = require('node-persist');


(async() => {
    // const array = [1, 1, 1, 1]
    // try {
    //     array.forEach(i => {
    //         throw new Error('test');
    //     });
    // } catch (error) {
    //     console.log(error);
    // }


    await storage.init({
        dir: './persist',
    
        stringify: JSON.stringify,
    
        parse: JSON.parse,
    
        encoding: 'utf8',
    
        logging: true,  // can also be custom logging function
    
        ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
    
        expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache
    
        forgiveParseErrors: false
    });
    await storage.setItem('name', JSON.stringify({
        abc: '123',
        sdfsd: 'fasdfasdf'
    }));
    await storage.setItem('name1', {
        abc: '123',
        sdfsd: 'fasdfasdf'
    });
    console.log(await storage.getItem('name')); // yourname
    console.log(await storage.getItem('name1')); // yourname
})()