 interface IError {
  message: string;
}

export interface IResponseError {
  success: boolean;
  errors: Array<IError>;
}
export interface IThrowError {
  message: string | Array<IError>;
  status?: number;
}
