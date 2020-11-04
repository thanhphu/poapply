'use strict';

const pofile = require('pofile');
const replaceInFiles = require('replace-in-files');
const yargs = require("yargs");
const fs = require('fs');

let { argv } = yargs
  .scriptName('poapply')
  .usage("Usage: $0 -f po-file -o source-file")
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

function checkErr(err) {
  if (err) {
    console.log(err);
    exit(1);
  }
}

if (translated && sources) {
  fs.readFile(sources, 'utf8', (err, fileContent) => {
    checkErr(err);
    pofile.load(translated, (err, po) => {
      checkErr(err);
      po.items.forEach((item) => {
        fileContent = fileContent.replace(item.msgid, item.msgstr[0]);
      });
      fs.writeFile(sources + '.out', fileContent, checkErr);
    });
  });
}