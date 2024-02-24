const aws = require("aws-sdk");
const multer = require("multer");
const fs = require("fs");
const uploadTemp = multer({ dest: "public/tempUploads" });
aws.config.update({
  accessKeyId: process.env.DO_SPACE_ACCESS_KEY_ID,
  secretAccessKey: process.env.DO_SPACE_SECRET_ACCESS_KEY,
  endpoint: process.env.DO_SPACE_ENDPOINT,
});

const s3 = new aws.S3();

const uploadToSpace = async (req, res, next) => {
  const file = req.file;
  const params = {
    Bucket: process.env.DO_SPACE_BUCKET,
    Key: file.filename,
    Body: fs.createReadStream(file.path),
  };
  try {
    const uploadedFile = await s3.upload(params).promise();
    console.log(uploadedFile);
    req.uploadedFile = uploadedFile;
    next();
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error uploading file!",
    });
  } finally {
    fs.unlink(file.path, (err) => {
      if (err) console.error(err);
    });
  }
};

module.exports = { uploadToSpace, uploadTemp };
