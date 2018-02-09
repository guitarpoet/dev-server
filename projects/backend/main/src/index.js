/**
 * This is the demo example for showing how the express backend to run with dev server
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Wed Feb  7 09:41:40 2018
 */

"use strict";

const express = require("express");
const { enable_hotload, pipe, log } = require("hot-pepper-jelly");
const { config } = require("@guitarpoet/configurator");
const { init_express, start_app, handle_error,  add_routes } = require("./functions");

enable_hotload();

pipe("./config.yaml")([config(require), init_express, add_routes])
    .then(start_app).catch(console.error);
