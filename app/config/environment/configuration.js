const env = process.env.NODE_ENV || 'development';

console.log(`.${env}.js`);

module.exports = require(`./.${env}.js`);