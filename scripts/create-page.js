const fs =	require('fs'),
	  cli = require('cli-color');

var pageName = process.argv[2],
	layout = process.argv[3] || 'default';

if (pageName == undefined) {
	throw new Error('Page name is empty!');
} else {
	searchExistingPage('app/pages/', pageName, layout);
}

function searchExistingPage(dir, page, pageLayout) {
	fs.readdir(dir, function (err, items) {
		items.forEach(function (item) {
			if (item === page + '.pug') {
				throw new Error('Page ' + page + ' already exist!');
			}
		});

		if (pageLayout) {
			console.log(pageLayout)
		}
		
		createPage(page, dir, pageLayout);
		
		console.log(cli.greenBright('Page ' + cli.magentaBright(page.toUpperCase()) + ' with ' + cli.magentaBright(pageLayout.toUpperCase()) + ' layout was successfully created!'));
	});
}

function createPage(pageName, targetDir, layout) {
	var newPage = targetDir + pageName;



	fs.writeFile(newPage + '.pug', 'extends /blocks/layouts/' + layout + '\r\n\r\nblock content\r\n\tbody#' + pageName + '\r\n\t\t', (err) => {
		if (err) {
			throw err;
		}
	});
}
