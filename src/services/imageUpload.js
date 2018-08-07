/**
 * Handles file upload and fetching through the lcoudinaru API.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';

const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

module.exports.upload = (file, cb) => {
	cloudinary.uploader.upload(
		file,
		function(result) {
			cb(cloudinary.url(result.public_id));
		},
		{
			format: 'png',
			width: 300,
			height: 300,
			crop: 'limit'
		}
	);
};
