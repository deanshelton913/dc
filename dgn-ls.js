const program = require('commander');
const Dragonchain = require('./lib/Dragonchain');
const Table = require('cli-table');
program
  .version('0.1.0')
  .option('-s, --stage [stage]', 'Environment stage. dev, prod are the most popular.')
  .option('-e, --email <email>', 'Owners Email address')
  .parse(process.argv);

  (async () => {
    console.log() // pad the output by 1 line
    try {
      const chains = await Dragonchain.all(program.stage, program.email);
      if(chains.length > 1) {
        const table = new Table({ head: ["Id", "Email", "Name", "Status", "Version", "ProofScheme"] });
        chains.forEach(chain => {
          table.push({ [chain.id]: [chain.email, chain.name, chain.status, chain.version, chain.proofScheme] });
        });
        console.log(table.toString())
      } else {
        console.log('No chains.')
      }
    } catch(e) {
      console.error(e)
    }


    console.log() // pad the output by 1 line
  })()
