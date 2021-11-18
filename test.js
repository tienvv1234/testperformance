const Joi = require('@hapi/joi');

const obj = {
    type: 'onOff',
    name: 'tien',
    roomId: '123213',
    advanceSetting: {},
    state: {
        onOff: 'abc'
    }
};

const test = Joi.object({
    name: Joi.string().required(),
    roomId: Joi.string().required(),
    deviceId: Joi.string(),
    type: Joi.string().required(),
    icon: Joi.string(),
    pos: Joi.number(),
    effect: Joi.number(),
    advanceSetting: Joi.object({
        display: Joi.boolean(),
        enablePassword: Joi.boolean(),
        password: Joi.string(),
        vibrate: Joi.boolean(),
        voiceControl: Joi.boolean(),
    }).required(),
    state: Joi.object().required()
}).custom(validateItemByType);


const { error, value } = test.validate(obj);

console.log(error, value)

function validateItemByType(item, helpers) {
    // console.log('item', item);
    const testvalid = Joi.object({
        onOff: Joi.number().required(),
    });
    switch (item.type) {
        case 'onOff':
            // result = testvalid.validate(item.state);
            Object.assign(item.state, testvalid)
            break;

        default:
            break;
    }
    console.log('item', item)
    return item;
};