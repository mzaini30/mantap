#!/usr/bin/env node

import fs from 'fs'
import recursive from 'recursive-readdir-sync'
import {minify} from 'uglify-js'
import {exec} from 'child_process'
import cleanCss from 'clean-css'
import sharp from 'sharp'
import {platform} from 'process'

function createFolderIfNone(dirName) {
	if (!fs.existsSync(dirName)){
		fs.mkdirSync(dirName);
	}
}
createFolderIfNone('build')

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