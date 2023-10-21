import { NextFunction, Request, Response } from "express";
import { throwHttpError } from "../utils/error";

export const joiValidation =
  (joiSchema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validation = joiSchema.validate(req.body);
    if (validation.error) {
      return throwHttpError({ message: validation.error.message, status: 400 });
    }
    next();
  };
