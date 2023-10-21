import multer from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, "./uploads/");
    },
    filename: (_req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});
export { multerUpload };
