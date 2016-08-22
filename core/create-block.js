const fs =	require('fs'),
	  cli = require('cli-color');

let blocksDir = 'app/blocks/';

let args = process.argv,
	parsedArgs = getArgsFromCommandLine(args);

let extentableFile = parsedArgs.extFile,
	newBlocks = parsedArgs.blocks;

console.log(searchExistingBlocks(blocksDir, newBlocks))

if (newBlocks.length === 0) {
	console.log(cli.red('Here are not new blocks!'))
} else {

}

/*
 /
 / Parse commandline text
 /
 */

function getArgsFromCommandLine(args) {
	let argsList = {
		extFile: '',
		blocks: []
	};

	for (let arg in args) {
		if (args[arg] != process.execPath) {
			if (args[arg] != process.mainModule.filename) {
				if (args[arg].indexOf('EXT=') != -1) {
					argsList.extFile = args[arg].slice(4);
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
	let existBlocks = [];

	fs.readdir(dir, (err, items) => {
		let dirBlocks = [];

		if (err) {
			console.log(cli.red(err))
		} else {
			items.map((e) => {
				dirBlocks.push(e);
			});
		}

		for (let i = 0; i < newBlocks.length; i++) {
			for (let j = 0; j < dirBlocks.length; j++) {
				if (newBlocks[i] === dirBlocks[j]) {
					existBlocks.push(newBlocks[i]);
				}
			}
		}
	});

	return existBlocks;
}


//
// function searchExistingBlocks(dir, argument) {
// 	fs.readdir(dir, function (err, items) {
// 		items.forEach(function (item) {
// 			if (item === argument) {
// 				throw new Error('Block already exist!');
// 			}
// 		});
//
// 		createBlock(argument, dir);
// 		console.log(cli.greenBright('Block ' + cli.magentaBright(argument.toUpperCase()) + ' was successfully created!'));
// 	});
// }
//
// function createBlock(blockName, targetDir) {
// 	var newBlock = targetDir + blockName;
//
// 	importNewBlock('app/helpers/pug/import.pug', blockName);
//
// 	fs.mkdir(newBlock, (err) => {
// 		if (err) {
// 			throw err;
// 		} else {
// 			fs.writeFile(newBlock + '/' + blockName + '.pug', 'mixin ' + blockName + '()\r\n\t+b.' + blockName + '&attributes(attributes)\r\n\t\tblock', (err) => {
// 				if (err) throw err;
// 			});
// 			fs.writeFile(newBlock + '/' + blockName + '.styl', '.' + blockName + '\r\n\tdisplay block', (err) => {
// 				if (err) throw err;
// 			});
// 		}
// 	});
// }
//
// function importNewBlock(importFileName, blockName) {
// 	fs.appendFile(importFileName, 'include /blocks/' + blockName + '/' + blockName + '\r\n', (err) => {
// 		if (err) throw err;
// 	});
// }