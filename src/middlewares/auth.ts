import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { throwHttpError } from "../utils/error";
import authService from "../services/v1/auth/auth";
export const auth =
  (...roles: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let accessToken = req.cookies.accessToken;
      if (!accessToken) {
        if (req.headers.authorization) {
          accessToken = req.headers.authorization.split(" ")[0];
        }
      }

      const refreshToken = req.cookies.refreshToken;
      if (!accessToken) {
        return throwHttpError({
          message: "Not Authenticated",
          status: 401,
        });
      }

      let token = accessToken;
      // 'Bearer token'
      let decodedToken: any;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          //check refreshToken
          if (refreshToken) {
            try {
              const decodedRefreshToken: any = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
              );

              const getNewToken = await authService.getNewTokenByUserId(
                decodedRefreshToken._id
              );
              token = getNewToken.accessToken;
              decodedToken = jwt.verify(
                getNewToken.accessToken,
                process.env.JWT_SECRET
              );
            } catch (err) {
              return throwHttpError({
                message: "token expired",
                status: 401,
              });
            }
          } else {
            return throwHttpError({
              message: "token expired",
              status: 401,
            });
          }
        } else {
          return throwHttpError({
            message: "Invalid token.",
            status: 400,
          });
        }
      }

      if (!decodedToken) {
        return throwHttpError({
          message: "Not Authenticated.",
          status: 401,
        });
      }

      // if (roles.length) {
      //   if (!roles.includes(decodedToken.role)) {
      //     return throwHttpError({
      //       message: "Not Authorized.",
      //       status: 403,
      //     });
      //   }
      // }

      req.user = decodedToken;
      return next();
    } catch (error) {
      next(error);
    }
  };
