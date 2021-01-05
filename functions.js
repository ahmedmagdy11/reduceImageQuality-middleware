const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const asyncUnlink = promisify(fs.unlink);
const asyncRename = promisify(fs.rename);


function getNewImagePath(oldPath) {
	const oldName = path.basename(oldPath);
	const newName = oldName.split(".")[0] + "temp" + path.extname(oldName);

	return oldPath.replace(oldName, newName);
}
async function deleteTheOldImageAndRename(oldName, newName) {
	try {
		await asyncUnlink(oldName);
		await asyncRename(newName, oldName);
	} catch (e) {
		console.log(e);
		console.log("something happened while trying to delete old image and rename");
		console.log("old name: " + oldName);
		console.log("new name: " + newName);
	}
}



function reduceQuality(...images) {
	images.forEach((image) => {
		// we need to make a newName for the image cause re-writting to the same image filename throws an FFMPEG error;
		const newImage = getNewImagePath(image);
		exec(`ffmpeg -i ${image} -q:v 20 ${newImage} -y`, (error, stdout, stderr) => {
			if (error) {
				console.log(error);
				console.error(`stderr: ${stderr}`);
				return;
			}
			//rename that one with old Name
			deleteTheOldImageAndRename(image,newImage);
		});
	});
}

module.exports = reduceQuality; 
