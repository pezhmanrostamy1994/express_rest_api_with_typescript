import { IUpload } from "./IUpload";
import AbrArvanUpload from "./abrarvan/abrArvanUpload";

class Upload implements IUpload {
  private abrArvanService: IUpload;
  constructor() {
    this.abrArvanService = AbrArvanUpload;
  }
  async uploadFile(path: string): Promise<IServiceResult<string>> {
    const data = await this.abrArvanService.uploadFile(path);
    const result = {
      data: data.data,
    };
    return result;
  }
}
export default new Upload();
