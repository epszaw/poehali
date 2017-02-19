'use strict';

const fs =  require('fs'),
      cli = require('cli-color');

const blocksDir = 'app/blocks/',
      layoutsDir = 'app/layouts/',
      pagesDir = 'app/pages/',
      rawArgs = process.argv,
      parsedArgs = getArgsFromCommandLine(rawArgs),
      extendableContent = parsedArgs.ext,
      newBlocks = parsedArgs.blocks,
      existBlocks = searchExistingBlocks(blocksDir, newBlocks);

if (newBlocks.length === 0) {
  console.error(cli.red('Here are not new blocks!'));
} else {
  createBlocks(newBlocks, existBlocks, extendableContent);
}

/**
 * @param args Object
 */

function getArgsFromCommandLine(args) {
  let argsList = {
    ext: {
      block: null,
      layout: null,
      page: null
    },
    blocks: []
  };

  Object.keys(args).map((key) => {
    if (args[key] != process.execPath) {
      if (args[key] != process.mainModule.filename) {
        if (args[key].indexOf('EXTB=') != -1) {
          argsList.ext.block = args[key].slice(5);
        } else if (args[key].indexOf('EXTL=') != -1) {
          argsList.ext.layout = args[key].slice(5);
        } else if (args[key].indexOf('EXTP=') != -1) {
          argsList.ext.page = args[key].slice(5);
        } else {
          argsList.blocks.push(args[key]);
        }
      }
    }
  });

  return argsList;
}

/**
 * @param dir String
 * @param newBlocks Array
 * @returns existBlocks Array
 */

function searchExistingBlocks(dir, blocksNames) {
  let existingBlocks = [],
      dirContent = fs.readdirSync(dir, 'utf-8');

  for (let i = 0; i < blocksNames.length; i++) {
    for (let j = 0; j < dirContent.length; j++) {
      if (blocksNames[i] === dirContent[j]) {
        existingBlocks.push(blocksNames[i]);
      }
    }
  }

  return existingBlocks;
}

/**
 * @param newBlocks Array
 * @param existBlocks Array
 * @param extendableObject Object
 */

function createBlocks(newBlocksNames, existBlocksNames, extendableObject) {
  const extendable = {
    block: extendableObject.block || null,
    layout: extendableObject.layout || null,
    page: extendableObject.page || null
  };

  let createdBlocks = [];

  newBlocksNames.forEach((e) => {
    let pugTemplate = `//- include start\r\n//- include end\r\n\r\nmixin ${ e }()\r\n  +b.${ e }&attributes(attributes)\r\n    block`,
        cssTemplate = `.${ e } {\r\n  display: block;\r\n}`,
        newBlockPath = blocksDir + e;

    if (existBlocksNames.indexOf(e) === -1) {
      fs.mkdir(newBlockPath, (err) => {
        if (err) {
          console.info(cli.red(`${ e } is already exist! Detail: ${ err }`));
        } else {
          fs.writeFile(`${ newBlockPath }/${ e }.pug`, pugTemplate);
          fs.writeFile(`${ newBlockPath }/${ e }.css`, cssTemplate);
        }
      });

      createdBlocks.push(e);
    }
  });

  includeNewBlock(extendable, createdBlocks);

  console.info(cli.green(`Blocks: ${ createdBlocks.join(', ') }  successfully create!`));
}

/**
 * @param extendableObject Object
 * @param createdBlocks Array
 */

function includeNewBlock(extendableObject, createdBlocks) {
  Object.keys(extendableObject).map((key) => {
    if (extendableObject[key] !== null) {
      let extendedFile = fs.readFileSync(getExtendedFilePath(key, extendableObject[key]).fullPath, 'utf-8');

      if (extendedFile != undefined) {
        let includeSectionStart = extendedFile.indexOf('//- include start'),
            includeSectionEnd = extendedFile.indexOf('//- include end'),
            fileIncludes = '',
            fileContent = extendedFile.slice(includeSectionEnd + '//- include end'.length);

        if (includeSectionStart === -1) {
          console.error(cli.red(`Including to ${ extendableObject[key] } is not possible. Define "include section" and try again`));

          return false;
        } else {
          fileIncludes = extendedFile.slice(includeSectionStart, includeSectionEnd - 1);

          createdBlocks.map((e) => {
            let includeTemplate = `\r\ninclude /blocks/${ e }/${ e }`;

            if (fileIncludes.indexOf(e) === -1) {
              fileIncludes += includeTemplate;
            } else {
              console.error(cli.red(`${ e } is already included to ${ extendableObject[key] }`));
            }
          });

          fileIncludes += '\r\n//- include end';

          fs.writeFile(getExtendedFilePath(key, extendableObject[key]).fullPath, fileIncludes + fileContent, (err) => {
            if (err) {
              console.error(cli.red(err));
            }
          });
        }
      }
    }
  });
}

/**
 * @param fileType String
 * @param fileName String
 * @returns fileData Object
 */

function getExtendedFilePath(fileType, fileName) {
  let fileData = {
    path: '',
    fullPath: '',
    fileName
  };

  switch (fileType) {
    case 'block':
      fileData.path = blocksDir + fileName;
      fileData.fullPath = `${ blocksDir }${ fileName }/${ fileName }.pug`;
      break;
    case 'layout':
      fileData.path = layoutsDir;
      fileData.fullPath = `${ layoutsDir }${ fileName }.pug`;
      break;
    case 'page':
      fileData.path = pagesDir;
      fileData.fullPath = `${ pagesDir }${ fileName }.pug`;
      break;
  }

  return fileData;
}
