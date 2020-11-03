'use strict';

const pofile = require('pofile');
const replaceInFiles = require('replace-in-files');
const yargs = require("yargs")
  
let { argv } = yargs
  .scriptName('poapply')
  .usage("Usage: $0 -f po-file -o source-files")
  .option('f', {
    alias: 'translated',
    type: 'string',
    nargs: 1
  })
  .option('o', {
    alias: 'sources',
    type: 'string',
    nargs: 1
  })
  .normalize('f')
  .normalize('o');

let { translated, sources } = argv
translated = translated.trim();
sources = sources.trim();

if (translated && sources) {
  pofile.load(translated, (err, po) => {
    if (err) {
      console.log(err);
      exit(1);
    }
    po.items.forEach((item) => {
      replaceInFiles({
        files: sources,
        from: item.msgid,
        to: item.msgstr[0]
      })
    })
  })
}