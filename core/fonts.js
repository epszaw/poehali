'use strict';

const fs = require('fs');

let fontsDir = 'app/assets/fonts',
	stylFile = 'app/assets/styles/fonts.styl',
	stylImportPath = '../fonts/',
	fontsNames = fs.readFileSync('.fonts', 'utf-8').split(' ');

let fonts = fs.readdirSync(fontsDir);

let weightList = {
	'hairline': 100,
	'ultralight': 200,
	'light': 300,
	'regular': 400,
	'medium': 500,
	'semibold': 600,
	'bold': 700,
	'ultrabold': 800,
	'black': 900
};

createImportFile(fontsNames, fonts, stylFile, stylImportPath);

function createImportFile(fontsNames, fonts) {
	let importContent = '';

	fonts.map((e) => {
		for (let weight in weightList) {
			let weightRegExp = new RegExp(weight),
				styleRegExp = new RegExp(/italic/);

			let fontName = getFontName(fontsNames, e);

			if (weightRegExp.test(e.toLowerCase()) && styleRegExp.test(e.toLowerCase())) {
				importContent += parseTemplate(fontName, stylImportPath, e, 'italic');
			} else if (weightRegExp.test(e.toLowerCase())) {
				importContent += parseTemplate(fontName, stylImportPath, e, 'normal');
			}
		}
	});

	console.log(importContent)
}

function parseTemplate(fontName, pathToFont, fontFilename, fontStyle) {
	let fontWeight = getFontWeight(fontFilename, weightList);
	let fontTemplate =  '@font-face\r\n' +
						'\tfont-family ' + fontName + '\r\n' +
						'\t\tsrc: url(\'' + pathToFont + fontFilename + '\') format(\'' + fontFilename.slice(fontFilename.indexOf('.') + 1) + '\')\r\n\r\n' +
						'\tfont-weight ' + fontWeight + '\r\n' +
						'\tfont-style ' + fontStyle + '\r\n\r\n';

	return fontTemplate;
}

function getFontName(fontsNames, fontFile) {
	let fontName = '';

	fontsNames.map((e) => {
		let fontNameRegExp = new RegExp(e);

		if (fontNameRegExp.test(fontFile)) {
			fontName = e
		}
	});

	return fontName;
}

function getFontWeight(fontFileName, weightList) {
	for (let weight in weightList) {
		let weightRegExp = new RegExp(weight);

		if (weightRegExp.test(fontFileName.toLowerCase())) {
			return weightList[weight];
		}
	}
}