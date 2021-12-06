#!/usr/bin/env node

const fs = require('fs')
const recursive = require('recursive-readdir-sync')
const {minify} = require('uglify-js')
const {exec} = require('child_process')
const cleanCss = require('clean-css')
const sharp = require('sharp')
const {platform} = require('process')

function createFolderIfNone(dirName) {
	if (!fs.existsSync(dirName)){
		fs.mkdirSync(dirName);
	}
}

createFolderIfNone('./build')

const files = recursive('src')

const fileJs = [...files].filter(x => x.match(/\.js$/))
const fileCss = [...files].filter(x => x.match(/\.css$/))
const fileGambar = [...files].filter(x => x.match(/\.(png|jpg|jpeg)$/i))

for (let x of fileJs){
	let filenya = fs.readFileSync(x, 'utf8')
	filenya = minify(filenya)
	fs.writeFileSync(x.replace('src', 'build'), filenya.code, 'utf8')
}

for (let x of fileCss){
	let filenya = fs.readFileSync(x, 'utf8')
	filenya = new cleanCss().minify(filenya)
	fs.writeFileSync(x.replace('src', 'build'), filenya.styles, 'utf8')
}

for (let x of fileGambar){
	if (platform == 'linux') {

		let file = x.split('/').reverse()[0]
		sharp(x).toFile(`build/${file.replace(/\..+$/, '.webp')}`)

	} else if (platform == 'win32'){

		let file = x.split('\\').reverse()[0]
		sharp(x).toFile(`build\\${file.replace(/\..+$/, '.webp')}`)

	}
}