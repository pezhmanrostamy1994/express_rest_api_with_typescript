export interface IUpload {
  uploadFile: (path: string) => Promise<IServiceResult<string>>;
}
