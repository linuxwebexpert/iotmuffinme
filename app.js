/**
 * IoT Muffin In Me
 *
 * @author Linux Web Expert <https://github.com/linuxwebexpert>
 * @since 2021-11-15
 * @namespace MuffinMix
 */

/**
 * Enables interacting with the file system in a way modeled on standard POSIX functions
 * @see https://nodejs.org/docs/latest-v14.x/api/fs.html
 * @example https://nodejs.dev/learn/reading-files-with-nodejs
 * @type {fs}
 */
const fs = require('fs');

/**
 * Generate massive amounts of fake data in the browser and node.js
 * @see https://github.com/Marak/Faker.js
 * @requires faker
 * @type {Faker}
 */
const faker = require('faker');

/**
 * Provides utilities for working with file and directory paths
 * @see https://nodejs.org/docs/latest-v14.x/api/path.html
 */
const path = require('path');

/**
 * Axios is a promise-based HTTP Client for node.js
 * @see https://axios-http.com/docs/intro
 * @see https://github.com/axios/axios
 * @type {AxiosPromise}
 */
const axios = require('axios');

/**
 * Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
 * @see https://github.com/motdotla/dotenv
 */
require('dotenv').config({
    path: path.join(__dirname, '.env'),
});

/**
 * Get the current line number of the executing file and method
 * @see https://github.com/bevry/get-current-line
 * @type {Location}
 */
const line = require('get-current-line');

/**
 * Provides information about, and control over, the current Node.js process.
 * @see https://nodejs.org/docs/latest-v14.x/api/process.html
 * @type {NodeJS.Global.process}
 */
const process = require("process");

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

/**
 * Load the configuration data for the IMT secret recipe
 * @param {String} filename - File path location for JSON config
 * @returns {*}
 */
function readData(filename) {
    let data;
    try {
        data = fs.readFileSync(__dirname + '/' + filename, 'utf8');
    } catch (err) {
        let trace = line.default();
        alertMsg(trace, err, 1);
    }
    alertMsg(line.default(), 'Loaded: ' + filename + ' -  Character length: ' + data.length, 5, data);
    return data;
}




function doIt(myCount) {
    let myObj = {};
    for (let i = 1; i <= myCount; i++) {
        const myTest = faker.datatype.number({min: 13, max: 67});
        alertMsg(line.default(), 'Found faker random datatype number = ' + myTest);
        myObj[i] = myTest;
    }
    alertMsg(line.default(),'Assembled IMT sensor object',4, myObj);
}





const configData = readData('imt.json');

let myCount = process.env['IMT_SENSOR_COUNT'];
doIt(myCount);
