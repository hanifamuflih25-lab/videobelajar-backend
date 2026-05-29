import multer from "multer";

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

// INIT MULTER
const upload = multer({
  storage,
});

export default upload;