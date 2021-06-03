const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const storage = multerS3({
  //multerS3 설정 항목
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME, //bucket 이름
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read-write', //읽고 쓰기 모두 허용
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + file.originalname.split('.').pop());
  },
  limit: { fileSize: 5 * 1024 * 1024 },
});

exports.upload = multer({ storage: storage });
