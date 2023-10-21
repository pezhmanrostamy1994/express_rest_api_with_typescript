import { Request, Response } from "express";
import { TOKEN_NAMES } from "../../utils/const";
import { IToken, IReqUser } from "../../../src/interfaces/auth";
import AuthServices from "../../services/v1/auth/auth";
import { responseJson } from "../helperController";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const result = await AuthServices.register(req.body);
    res.cookie(TOKEN_NAMES.accessToken, result.data.accessToken, {
      domain: "/",
    });
    res.cookie(TOKEN_NAMES.refreshToken, result.data.refreshToken, {
      domain: "/",
    });

    responseJson(res, result);
  }

  async login(req: Request, res: Response): Promise<void> {
    const result: IServiceResult<IToken> = await AuthServices.login(req.body);

    res.cookie(TOKEN_NAMES.accessToken, result.data.accessToken);
    res.cookie(TOKEN_NAMES.refreshToken, result.data.refreshToken);

    responseJson(res, result);
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const result = await AuthServices.findOne(name);

    responseJson(res, result);
  }
  async isAutorize(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies.accessToken || req.headers.authorization;
      const refreshToken = req.cookies.refreshToken;
      const result = AuthServices.isAthorize({
        accessToken,
        refreshToken,
      });
      responseJson(res, result);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthController();
