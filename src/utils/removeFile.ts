const fs = require("fs");
const path = require("path");

export const removeFile = (imagePath: string) => {
  const filePath = imagePath && path.join("uploads", imagePath);
  fs.existsSync(filePath) &&
    fs.unlink(filePath, (err: any) => console.log(err));
};
