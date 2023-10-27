const multer = require('multer');
const path = require('path');

// Định nghĩa nơi lưu trữ hình ảnh tải lên và đặt tên tệp tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/image'); // Thư mục 'uploads' để lưu trữ hình ảnh tải lên
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

// Cấu hình Multer
const upload = multer({ storage: storage });

const s = upload.fields([
  { name: 'imgSmall', maxCount: 1 },
  { name: 'imgBig', maxCount: 1 },
]);

module.exports = { s };
