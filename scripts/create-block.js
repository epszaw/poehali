const fs =	require('fs'),
	  cli = require('cli-color');

var arg = process.argv[2];

if (arg == undefined) {
	throw new Error('Block name is empty!');
} else {
	searchExistingBlocks('app/blocks/', arg);
}

function searchExistingBlocks(dir, argument) {
	fs.readdir(dir, function (err, items) {
		items.forEach(function (item) {
			if (item === argument) {
				throw new Error('Block already exist!');
			}
		});

		createBlock(argument, dir);
		console.log(cli.greenBright('Block ' + argument.toUpperCase() + ' was successfully created!'));
	});
}

function createBlock(blockName, targetDir) {
	var newBlock = targetDir + blockName;

	importNewBlock('app/helpers/pug/import.pug', blockName);

	fs.mkdir(newBlock, (err) => {
		if (err) {
			throw err;
		} else {
			fs.writeFile(newBlock + '/' + blockName + '.pug', 'mixin ' + blockName + '()\r\n\t+b.' + blockName + '&attributes(attributes)\r\n\t\tblock', (err) => {
				if (err) throw err;
			});
			fs.writeFile(newBlock + '/' + blockName + '.styl', '.' + blockName + '\r\n\tdisplay block', (err) => {
				if (err) throw err;
			});
		}
	});
}

function importNewBlock(importFileName, blockName) {
	fs.appendFile(importFileName, 'include /blocks/' + blockName + '/' + blockName + '\r\n', (err) => {
		if (err) throw err;
	});
}