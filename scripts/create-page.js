const fs =	require('fs'),
	  cli = require('cli-color');

var arg = process.argv[2];

if (arg == undefined) {
	throw new Error('Page name is empty!');
} else {
	searchExistingPage('app/pages/', arg);
}

function searchExistingPage(dir, argument) {
	var sourceFileDir = 'app/blocks/';

	fs.readdir(dir, function (err, items) {
		items.forEach(function (item) {
			if (item === argument + '.jade') {
				throw new Error('Page ' + argument + ' already exist!');
			}
		});

		createPage(argument, dir, sourceFileDir);

		console.log(cli.greenBright('Page ' + argument.toUpperCase() + ' was successfully created!'));
	});
}

function createPage(pageName, targetDir, sourceFileDir) {
	var newPage = targetDir + pageName;

	fs.writeFile(newPage + '.jade', 'include /blocks/' + pageName + '-page/' + pageName + '-page\r\n\r\n', (err) => {
		if (err) {
			throw err;
		} else {
			createPageSource(pageName, sourceFileDir);
		}
	});
}

function createPageSource(pageName, targetDir) {
	var newPage = targetDir + pageName + '-page';

	fs.mkdir(newPage, (err) => {
		if (err) {
			throw err;
		} else {
			fs.writeFile(newPage + '/' + pageName + '-page.jade', 'extends /blocks/layout/default\r\n\r\nblock content\r\n\tbody#' + pageName + '\r\n\t\t', (err) => {
				if (err) throw err;
			});
		}
	});
}
