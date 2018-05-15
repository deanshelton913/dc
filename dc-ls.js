var program = require('commander');
var aws = require('aws-sdk');
program
  .version('0.1.0')
  .parse(process.argv);

  console.log('I am a dc', program.peppers);