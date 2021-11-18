const request = require('request');

const req = request.defaults({
    headers: {
        'content-type': 'application/json',
    },
    auth: {
        user: '16696944',
        pass: '36fa76dda4beb013aa48228da563f53f',
    },
    baseUrl: 'https://acuityscheduling.com/api/v1',
});

export const request = (method, url, option) => new Promise((resolve, reject) => {
    req[method](url, option, (err, res) => {
        // console.log(err, res);
        if (err) {
            // TODO: handle err
            reject(err);
        } else if (res && res.statusCode === 200) {
            // TODO Do something with response
            resolve(true);
        } else {
            reject(new Error((res && res.statusMessage) || `some thing went wrong in post request \n ${url} \n ${option}`));
        }
    });
});
