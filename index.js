'use strict';

const pofile = require('pofile');
const yargs = require('yargs');
const replaceInFiles = require('replace-in-files');

const argv = yargs
  .command('apply', 'Apply translated po files to source code', {
    pofile: {
      description: 'translated po file',
      alias: 'f',
      type: 'string'
    },
    files: {
      description: 'source code to apply transaltion',
      alias: 'o',
      type: 'string'
    }
  })
  .help()
  .alias('help', '?')
  .argv;

if (argv._.includes('apply')) {
  pofile.load(argv.pofile, (err, po) => {
    if (err) {
      console.log(err);
      exit(1);
    }
    po.items.forEach((item) => {
      replaceInFiles({
        files: argv.files,
        from: item.msgid,
        to: item.msgstr[0]
      })
    })
  })
}