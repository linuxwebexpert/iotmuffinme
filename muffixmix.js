/**
 * IoT Muffin In Me
 *
 * @author Linux Web Expert <https://github.com/linuxwebexpert>
 * @since 2021-11-15
 * @namespace MuffinMix
 */

/**
 * File system access for Node.JS
 * @see https://www.npmjs.com/package/fs
 * @example https://nodejs.dev/learn/reading-files-with-nodejs
 * @type {fs}
 */
const fs = require('fs');

/**
 * Faker library for Node.JS - random data generator
 * @see https://github.com/Marak/Faker.js
 * @requires faker
 * @type {Faker}
 */
const faker = require('faker');

/**
 * cURL compatible client for Node.JS similar to GuzzleHttp for PHP
 * @requires axios
 * @see https://github.com/axios/axios
 * @type {AxiosPromise}
 */
const axios = require('axios').default();

/**
 * @see https://github.com/motdotla/dotenv
 */
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});



