const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
import path from "path";

import { IUpload } from "../IUpload";
import { throwHttpError } from "../../../../utils/error";
import { removeFile } from "../../../../utils/removeFile";

const s3 = new S3Client({
  region: "default",
  endpoint: process.env.ABRARVAN_URL,
  credentials: {
    accessKeyId: process.env.ABRARVAN_KEY_ID,
    secretAccessKey: process.env.ABRARVAN_ACCESS,
  },
});

class AbrArvanUploadService implements IUpload {
  async uploadFile(filepath: string): Promise<IServiceResult<string>> {
    try {
      const uploadParams = {
        Bucket: process.env.ABRARVAN_IMAGES_BUKET_NAME, // bucket name
        Key: "object-name", // the name of the selected file
        ACL: "public-read", // 'private' | 'public-read'
        Body: "BODY",
      };
      const pathD = path.join("uploads", filepath);
      const fileStream = fs.createReadStream(pathD);
      fileStream.on("error", function (err: any) {
        throwHttpError({
          message: "خطا در بارگذاری فایل",
        });
      });
      uploadParams.Key = path.basename(pathD);
      // call S3 to upload file to specified bucket
      uploadParams.Body = fileStream;
      await s3.send(new PutObjectCommand(uploadParams));
      return { data: filepath };
    } catch (error) {
      throw error;
    } finally {
      removeFile(filepath);
    }
  }
}
export default new AbrArvanUploadService();
