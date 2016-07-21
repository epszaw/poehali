const fs =	require('fs'),
	cli = require('cli-color');

var blockName = process.argv[2],
	layoutName = process.argv[3];

if (blockName == undefined || layoutName == undefined) {
	throw new Error('Block name or layout is empty!');
} else {
	searchTargetLayout('core/blocks-layouts/', layoutName);
}

function searchExistingBlocks(dir, blockname) {
	fs.readdir(dir, function (err, items) {
		items.forEach(function (item) {
			if (item === blockname) {
				throw new Error('Block already exist!');
			}
		});
	});

	return true;
}



// createBlock(argument, dir);


function searchTargetLayout(layoutsDir, layoutName) {
	fs.readdir(layoutsDir, function (err, items) {
		var searchStatus = false;
		
		items.forEach(function (item) {
			if (item === layoutName + '.btpl') {
				blockLayoutParse(layoutsDir, layoutName, blockName);

				searchStatus = true;
			}
		});

		if (searchStatus === false) {
			throw new Error('Target layout ' + layoutName + '.pug is not exist!');
		}
	});
}

function blockLayoutParse(layoutsDir, layoutName, blockName) {
	var layoutContent = fs.readFileSync(layoutsDir + '/' + layoutName + '.btpl', 'utf8');
	
	if (searchExistingBlocks('app/blocks', blockName)) {
		var newBlockContent = layoutContent.replace(/@blockname/g, blockName),
			newBlock = 'app/blocks/' + blockName;

		importNewBlock('app/helpers/pug/import.pug', blockName);

		fs.mkdir(newBlock, (err) => {
			if (err) {
				throw err;
			} else {
				fs.writeFile(newBlock + '/' + blockName + '.pug', newBlockContent, (err) => {
					if (err) throw err;
				});
				fs.writeFile(newBlock + '/' + blockName + '.styl', '.' + blockName + '\r\n\tdisplay block', (err) => {
					if (err) throw err;
				});

				console.log(cli.greenBright('Block ' + cli.magentaBright(blockName.toUpperCase()) + ' extending from ' + cli.magentaBright(layoutName.toUpperCase()) + ' was successfully created!'));
			}
		});
	}
}

function importNewBlock(importFileName, blockName) {
	fs.appendFile(importFileName, 'include /blocks/' + blockName + '/' + blockName + '\r\n', (err) => {
		if (err) throw err;
	});
}