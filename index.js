#!/usr/bin/env node

import fs from 'fs-extra'
import recursive from 'recursive-readdir-sync'

function createFolderIfNone(dirName) {
	if (!fs.existsSync(dirName)){
		fs.mkdirSync(dirName);
	}
}

createFolderIfNone('./build')
fs.copy('./src', './build')

const files = recursive('build')

let fileJs = [...files].filter(x => x.includes('.js'))
let fileCss = [...files].filter(x => x.includes('.css'))
let fileGambar = [...files].filter(x => {
	return x.includes('.jpg') 
		|| x.includes('.JPG')
		|| x.includes('.jpeg')
		|| x.includes('.JPEG')
		|| x.includes('.png')
		|| x.includes('.PNG')
})

console.log(fileCss)