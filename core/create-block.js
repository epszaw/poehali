'use strict';

const fs =	require('fs'),
	  cli = require('cli-color');

/*
/
/ Variables
/
*/

let blocksDir = 'app/blocks/',
	layoutsDir = 'app/layouts/',
	pagesDir = 'app/pages/';

let args = process.argv,
	parsedArgs = getArgsFromCommandLine(args);

let extendableContent = parsedArgs.ext,
	newBlocks = parsedArgs.blocks,
	existBlocks = searchExistingBlocks(blocksDir, newBlocks);

if (newBlocks.length === 0) {
	console.log(cli.red('Here are not new blocks!'))
} else {
	createBlocks(newBlocks, existBlocks, extendableContent);
}

/*
 /
 / Parse commandline text
 /
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

	for (let arg in args) {
		if (args[arg] != process.execPath) {
			if (args[arg] != process.mainModule.filename) {
				if (args[arg].indexOf('EXTB=') != -1) {
					argsList.ext.block = args[arg].slice(5);
				} else if (args[arg].indexOf('EXTL=') != -1) {
					argsList.ext.layout = args[arg].slice(5);
				} else if (args[arg].indexOf('EXTP=') != -1) {
					argsList.ext.page = args[arg].slice(5);
				} else {
					argsList.blocks.push(args[arg]);
				}
			}
		}
	}

	return argsList;
}

/*
 /
 / Search exiting block
 /
 */

function searchExistingBlocks(dir, newBlocks) {
	let existBlocks = [],
		dirContent = fs.readdirSync(dir, 'utf-8');

	for (let i = 0; i < newBlocks.length; i++) {
		for (let j = 0; j < dirContent.length; j++) {
			if (newBlocks[i] === dirContent[j]) {
				existBlocks.push(newBlocks[i]);
			}
		}
	}

	return existBlocks;
}

/*
/
/ Create blocks
/
*/

function createBlocks(newBlocks, existBlocks, extendableObject) {
	const extendable = {
		block: extendableObject.block || null,
		layout: extendableObject.layout || null,
		page: extendableObject.page || null
	};

	let createdBlocks = [];

	newBlocks.forEach((e) => {
		let pugTemplate = 'mixin ' + e + '()\r\n\t+b.' + e + '&attributes(attributes)\r\n\t\tblock',
			stylTemplate = '.' + e + '\r\n\tdisplay block',
			newBlockPath = blocksDir + e;

		if (existBlocks.indexOf(e) === -1) {
			// fs.mkdir(newBlockPath, (err) => {
			// 	if (err) {
			// 		console.log(cli.red(e + ' is already exist! Detail: ' + err));
			// 	} else {
			// 		fs.writeFile(newBlockPath + '/' + e + '.pug', pugTemplate, (err) => {
			// 			if (err) {
			// 				console.log(cli.red(err));
			// 			}
			// 		});
			// 		fs.writeFile(newBlockPath + '/' + e + '.styl', stylTemplate, (err) => {
			// 			if (err) {
			// 				console.log(cli.red(err));
			// 			}
			// 		});
			//
			//
			// 	}
			// });

			createdBlocks.push(e);
		}
	});

	// includeNewBlock(extendable);

	console.log(cli.green('Blocks: ' + createdBlocks.join(', ') + ' successfully create!'));
}

/*
/
/ Including new block to target file
/
*/

function includeNewBlock(extendableObject) {
	for (let fileType in extendableObject) {
		if (extendableObject[fileType] !== null) {
			let extendedFile = getExtendedFile(fileType, extendableObject[fileType]);

			if (extendedFile != undefined) {

				console.log(extendedFile)
			}
		}
	}
}

/*
/
/ Get extended file type
/
*/

function getExtendedFile(fileType, fileName) {
	let filePath = '';

	switch (fileType) {
		case 'block':
			filePath = blocksDir + fileName + '/' + fileName + '.pug';
			break;

		case 'layout':
			filePath = layoutsDir + fileName + '.pug';
			break;

		case 'page':
			filePath = pagesDir + fileName + '.pug';
			break;
	}

	return fs.readFileSync(filePath, 'utf-8');
}