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
 * Provides information about, and control over, the current Node.js process.
 * @see https://nodejs.org/docs/latest-v14.x/api/process.html
 * @type {NodeJS.Global.process}
 */
const process = require("process");

/**
 * Get the current line number of the executing file and method
 * @see https://github.com/bevry/get-current-line
 * @type {Location}
 */
const line = require('get-current-line');

/**
 * Promise based HTTP client for the browser and node.js
 * @see https://axios-http.com/docs/intro
 * @see https://github.com/axios/axios
 * @type {AxiosStatic}
 */
const axios = require('axios').default;

const format = require('date-format');



/**
 * Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
 * @see https://github.com/motdotla/dotenv
 */
let envFile;
    try {
        if (fs.existsSync('.env.local')) {
            //file exists
            envFile = '.env.local'
        } else if (fs.existsSync('.env')) {
            envFile = '.env';
        }
    } catch(err) {
        alertMsg(line.default(),'Could not locate a dotenv file!',3, err);
    }

    let data = readData(envFile,'utf8');
    if (process.env.DEBUG >= 2 && data.length > 0) {
        alertMsg(line.default(), 'Found local environment dotenv file...', 4, data);
    }

require('dotenv').config({
    path: path.join(__dirname, envFile),
    debug: 1
});

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
 * @param {String} format - UTF8 by default or optional other character set
 * @returns {*}
 */
function readData(filename, format = 'utf8') {
    let data;
    try {
        data = fs.readFileSync(__dirname + '/' + filename, format);
    } catch (err) {
        alertMsg(line.default(), 'Could not read data from ' + filename, 3, err);
    }
    alertMsg(line.default(), 'Loaded: ' + filename + ' -  Character length: ' + data.length, 5, data);
    return data;
}

/**
 * Create a random number based on a factored equation
 * @param {Number} max - maximum value
 * @param {Number} factor - dividing factor
 * @param {Number} fallback - default fallback value
 * @returns {*}
 */
function multiplyFactor(max, factor, fallback) {
    let multiX = faker.datatype.number({min: 1, max: max});
    if (multiX <= (max - factor)) { multiX = fallback } else { multiX = multiX / (factor / fallback) }
    return multiX;
}

/**
 * Generates an Elasticsearch index
 * @returns {{iso8601: string, index: string}}
 */
function dateIndex() {

    let d = new Date();

    let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    let index = process.env['ELASTIC_INDEX'] + '.' + mo + '.' + ye;
    let iso8601 = d.toISOString();

    alertMsg(line.default(), 'Generated Elasticsearch index: ' + index, 4);
    return { "index": index, "iso8601": iso8601 };
}

async function sendElastic(elk) {

    if (!(elk instanceof Object)) {
        alertMsg(line.default(), 'ELK data does not conform to guzzleElastic requirements', 3, elk);
        return false;
    }

    let elasticHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        };

    const elkData = JSON.stringify(elk);

    const now = new Date();

    let elasticIndex = process.env.ELASTIC_ENDPOINT + ':' + process.env.ELASTIC_PORT + '/' + process.env.ELASTIC_INDEX + '.' + format('MM.yy', now) + '/_doc/';

    let pass = null;
    axios.post(
        elasticIndex,
        elkData, {
            headers: elasticHeaders,
            auth: {
                username: process.env.ELASTIC_USER,
                password: process.env.ELASTIC_PASSWORD
            }
        })
        .then(function (response) {
            // handle success
            alertMsg(line.default(),'Successful post to ' + elasticIndex, 4, response);
            pass = true;
        })
        .catch(function (error) {
            // handle error
            alertMsg(line.default(),'Error posting to ' + elasticIndex, 3, error);
            pass = false;
        })
        .then(function () {
            // always executed
            if (process.env.DEBUG >= 2) {
                let passArg = [];
                passArg['pass'] = pass;
                alertMsg(line.default(), 'Executed the axios HTTP POST request', 4, passArg);
            }
        });
    return pass;
}


/**
 * Generate some fake data for a muffin
 * @param {Number} IMTid - IoT Muffin Tray number
 * @param {Number} sensorNum - Cup Sensor number
 */
function bakeMuffin(IMTid, sensorNum) {
    let myTray = {};
    for (let i = 1; i <= sensorNum; i++) {
        let myTest = multiplyFactor(99, 55, 11);
        alertMsg(line.default(), 'Found faker random datatype number = ' + myTest);
        myTray[i] = myTest;
    }
    alertMsg(line.default(),'Assembled IMT sensor object',4, myTray);
    let pass = sendElastic(myTray);
}


const rawData = readData('imt.json');

const config = JSON.parse(rawData);

let myCount = config.sensors;
let elasticIndex = dateIndex();
console.log(myCount,elasticIndex);
bakeMuffin(1, myCount);

