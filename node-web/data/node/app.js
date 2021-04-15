const express = require('express');
const app = express();

const router   = require('./utils/router');
const listener = require('./utils/listener')

router(app);
listener(app);