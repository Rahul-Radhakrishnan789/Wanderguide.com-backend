// const multer = require('multer');

// const fileFilter = (req, file, cb) => {
//   const allowedExtensions = ['jpg', 'jpeg', 'png'];
//   const fileName = file.originalname.split('.')[0];
//   const fileExtension = file.originalname.split('.')[1];

//   if (allowedExtensions.includes(fileExtension)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only .jpg, .jpeg, and .png files are allowed.'));
//   }
// };

// const upload = multer({
//   fileFilter,
//   storage: multer.diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//       cb(null, `${fileName}-${Date.now()}.${fileExtension}`);
//     },
//   }),
// });

// module.exports = upload;

// const multer = require('multer');

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   }
// });
 
// const upload = multer({ storage: storage });

// module.exports = upload;

const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            const fileType = file.mimetype.split('/')[1]
            cb(null, file.fieldname + '-' + Date.now() + "." + fileType);
        } 
    }),
});

module.exports = upload; 