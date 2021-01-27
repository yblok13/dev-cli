#!/usr/bin/env node

const arg = require('arg');
const { exec, spawn } = require('child_process');
const chalk = require('chalk');

const args = arg({
  '--help': Boolean,
  '--logs': String,
})




if (args['--logs']) {
  const tail = exec(`tail -f ${args['--logs']}`)

  tail.stdout.on('data', data => {
    data = data.split('\n').filter(Boolean);
    data.forEach(d => {
      d = JSON.parse(d)
      cmdLine([
        {
          text: d.process_id,
          color: 'yellow'
        },
        ':',
        {
          text: d.app_name,
          color: 'green'
        },
        {
          text: d.timestamp,
          justify: 'center',
          color: 'blue'
        },
        '\n',
        {
          text: d.message,
          color: d.type !== 'out' && 'red' 
        }
      ])
    })
  })
}



function cmdLine(strings = []) {
  const termWidth = process.stdout.columns;
  let log = '';

  strings.forEach(s => {
    if (typeof s === 'string') return log = log.concat(s);
    let newText = s.text;
    if (s.color) {
      newText = chalk[s.color](newText)
    }
    if (s.justify === 'right') {
      newText = Array(termWidth - s.text.length - log.length).join(' ') + newText
    }
    if (s.justify === 'center') {
      newText = Array(~~(termWidth/2 - s.text.length/2 - log.length)).join(' ') + newText
    }
    log = log.concat(newText)
  })

  console.log(log)
}


