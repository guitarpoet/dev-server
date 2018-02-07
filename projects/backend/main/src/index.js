/**
 * This is the demo example for showing how the express backend to run with dev server
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Wed Feb  7 09:41:40 2018
 */

"use strict";

const express = require("express");
const { pipe, log } = require("hot-pepper-jelly");
const { config } = require("@guitarpoet/configurator");

pipe("./config.yaml")([config(require)]).then(() => {
    log("Hi");
}).catch(console.error);
