#!/usr/bin/env node

import fs from 'fs'
import recursive from 'recursive-readdir-sync'
import {minify} from 'uglify-js'
import {exec} from 'child_process'
import cleanCss from 'clean-css'

function createFolderIfNone(dirName) {
	if (!fs.existsSync(dirName)){
		fs.mkdirSync(dirName);
	}
}

createFolderIfNone('./build')

const files = recursive('src')

const fileJs = [...files].filter(x => x.match(/\.js$/))
const fileCss = [...files].filter(x => x.match(/\.css$/))

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

exec("sharp -i './src/**/*.*' -o ./build -f webp")