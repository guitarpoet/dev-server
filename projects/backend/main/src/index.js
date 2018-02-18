/**
 * This is the demo example for showing how the express backend to run with dev server
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Wed Feb  7 09:41:40 2018
 */

"use strict";

const express = require("express");
const { log, proxy_exclude_patterns } = require("hot-pepper-jelly");
const { configure } = require("@guitarpoet/configurator");
const { init_express, start_app, handle_error,  add_routes } = require("./functions");

// Let's exclude all node modules files
proxy_exclude_patterns([/.*node_modules.*/]);

configure([init_express, add_routes])
    .then(start_app).catch(console.error);
