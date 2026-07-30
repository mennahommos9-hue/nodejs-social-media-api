const imagekit = require("../config/imageKit");

const uploadToImageKit = async (file) => {

    const result = await imagekit.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`
    });

    return result.url;
};

module.exports = uploadToImageKit;