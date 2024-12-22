const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}


module.exports = {
SESSION_ID: 'HANSAMAL-MD=nZkQzDQA#2C75-KxSAeQd9PHrhazxPGnO0g5NHes6TjHCmt_Xgz8',
GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN === undefined ? 'F5ddKGWr7D2dBbEAG1PG69Z4Dzyeo02iToij' : process.env.GITHUB_AUTH_TOKEN,
GITHUB_USER_NAME: process.env.GITHUB_USER_NAME === undefined ? 'xchamonirmal' : process.env.GITHUB_USER_NAME,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '94743430452' : process.env.OWNER_NUMBER
};
