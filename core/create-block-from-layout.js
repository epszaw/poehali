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
				throw new Error('Block ' + blockname.toUpperCase() + ' already exist!');
			}
		});
	});

	return true;
}

function searchTargetLayout(layoutsDir, layoutName) {
	fs.readdir(layoutsDir + layoutName + '/', function (err, items) {
		var searchStatus = {
			markup: false,
			style: false
		};
		
		items.forEach(function (item) {
			if (item === layoutName + '.pug') {
				searchStatus.markup = true;
			} else if (item === layoutName + '.styl') {
				searchStatus.style = true;
			}

			if (searchStatus.markup === true && searchStatus.style === true) {
				createBlock(layoutsDir, layoutName, blockName);
			}
		});

		if (searchStatus === false) {
			throw new Error('Target layout ' + layoutName + '.pug or ' + layoutName + '.styl is not exist!');
		}
	});
}

function createBlock(layoutsDir, layoutName, blockName) {
	var templateMarkup = fs.readFileSync(layoutsDir + '/' + layoutName + '/' + layoutName + '.pug', 'utf8'),
		templateStyle = fs.readFileSync(layoutsDir + '/' + layoutName + '/' + layoutName + '.styl', 'utf8');

	var newBlockMarkup = parseTemplateFile(templateMarkup, blockName),
		newBlockStyle = parseTemplateFile(templateStyle, blockName);


	if (searchExistingBlocks('app/blocks', blockName)) {
		var newBlock = 'app/blocks/' + blockName;

		importNewBlock('app/helpers/pug/import.pug', blockName);

		fs.mkdir(newBlock, (err) => {
			if (err) {
				throw err;
			} else {
				fs.writeFile(newBlock + '/' + blockName + '.pug', newBlockMarkup, (err) => {
					if (err) throw err;
				});
				fs.writeFile(newBlock + '/' + blockName + '.styl', '.' + newBlockStyle, (err) => {
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

function parseTemplateFile(templateFile, blockName) {
	return templateFile.replace(/@blockname/g, blockName);
}