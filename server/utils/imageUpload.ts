import multer from "multer";

// below sets up the file name and storage location for the image that is uploaded by the user
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // clean the filename and keep original extension of file
    const lastDot = file.originalname.lastIndexOf(".");
    const cleanName = file.originalname
      .substring(0, lastDot)
      .replace(/([^a-z0-9]+)/gi, "-");
    const ext = file.originalname.substring(lastDot, file.originalname.length);

    cb(null, cleanName + ext);
  },
});
const upload = multer({ storage: storage });

export default upload;
