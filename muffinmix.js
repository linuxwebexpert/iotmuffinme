/**
 * IoT Muffin In Me
 *
 * @author Linux Web Expert <https://github.com/linuxwebexpert>
 * @since 2021-11-15
 * @namespace MuffinMix
 */

/**
 * File system access for Node.JS
 * @see https://nodejs.org/docs/latest-v14.x/api/fs.html
 * @example https://nodejs.dev/learn/reading-files-with-nodejs
 * @type {fs}
 */
const {fs} = require('fs');

/**
 * Faker library for Node.JS - random data generator
 * @see https://github.com/Marak/Faker.js
 * @requires faker
 * @type {Faker}
 */
const faker = require('faker');

/**
 * File Path library for Node.JS - directory information
 * @see https://nodejs.org/docs/latest-v14.x/api/path.html
 */
const path = require('path');

/**
 * cURL compatible client for Node.JS similar to GuzzleHttp for PHP
 * @requires axios
 * @see https://github.com/axios/axios
 * @type {AxiosPromise}
 */
const {axios} = require('axios');

/**
 * @see https://github.com/motdotla/dotenv
 */
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});

/**
 *
 * @type {Location}
 */
const line = require('get-current-line');

/**
 * Implementation of sleep for JavaScript
 * @param milliseconds
 */
function sleep(milliseconds) {
    alertMsg(line.default(),'Sleeping ' + milliseconds + ' milliseconds...',4);
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


/**
 * Print out the current line, file, function and console message using error levels
 * @param {string} msg - String to print to the console
 * @param {number} level - Log level as defined by the standards
 * @param {Location} trace - get-current-line Location information
 * @param {* | null} data - Object, Array, or any type data for debug output
 */
function alertMsg(trace, msg, level, data = null) {
    const path = require('path');
    const file = path.basename(trace.file);
    const errmsg = file + ' - ' + trace.method.toString() + ':' + trace.line  + ' - ' + msg;
    switch(level) {
        case 1:
            console.error(errmsg);
            break;
        case 2:
            console.exception(errmsg);
            break;
        case 3:
            console.warn(errmsg);
            break
        case 4:
            console.log(errmsg);
            break;
        case 5:
            console.info(errmsg);
            break;
        case 6:
            console.debug(errmsg);
            break;
        case 7:
            console.trace(errmsg);
            break;
        default:
            console.log(errmsg);
    }
    if (data != 'undefined' && data != null) {
        console.log(data);
    }
}

function doIt() {
    for (let i = 1; i <= 10; i++) {
        let myTest = faker.datatype.number({min: 13, max: 67});
        alertMsg(line.default(), 'Found faker random datatype number = ' + myTest);
    }
}

doIt();
