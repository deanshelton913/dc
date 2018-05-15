// file: ./examples/pm
var program = require('commander');

program
  .version('0.1.0')
  .command('ls', 'list running dragonchains')
  // .command('list', 'list packages installed', {isDefault: true})
  .parse(process.argv);