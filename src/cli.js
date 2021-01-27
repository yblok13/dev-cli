#!/usr/bin/env node

const arg = require('arg');
const streamLogs = require('./streamLogs')
const help = require('./help')

const args = arg({
  '--help': Boolean,
  '--logstream': String,
})

if (args['--logstream']) streamLogs(args['--logstream']);
if (args['--help']) help();

