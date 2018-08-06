/**
 * Handles file upload and fetching through the lcoudinaru API.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports.upload = file => {
    cloudinary.uploader.upload(
        file,
        result => result,
        {
            format: 'png',
            width: 200,
            height: 200,
            crop: 'limit',
            gravity: 'face'
        }
    );
};
