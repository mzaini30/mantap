#!/usr/bin/env node

import fs from 'fs-extra'
import recursive from 'recursive-readdir-sync'
import {minify} from 'uglify-js'

function createFolderIfNone(dirName) {
	if (!fs.existsSync(dirName)){
		fs.mkdirSync(dirName);
	}
}

createFolderIfNone('./build')
fs.copy('./src', './build').then(() => jalankan())

function jalankan(){
	const files = recursive('build')

	const fileJs = [...files].filter(x => x.match(/\.js$/))
	const fileCss = [...files].filter(x => x.match(/\.css$/))
	const fileGambar = [...files].filter(x => x.match(/\.(jpg|jpeg|png)$/i))

	for (let x of fileJs){
		let filenya = fs.readFileSync(x, 'utf8')
		filenya = minify(filenya)
		fs.writeFileSync(x, filenya.code, 'utf8')
	}
}