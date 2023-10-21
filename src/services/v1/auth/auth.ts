import bcryptjs from "bcryptjs";
import { throwHttpError } from "../../../utils/error";
import { IUser } from "../../../interfaces/user";
import UserRepo from "../../../repo/user";
import {
  IUserLogin,
  IToken,
  IGenerateUserToken,
  IIsAuthurize,
  IReqUser,
} from "../../../interfaces/auth";
import jwt from "jsonwebtoken";
class AuthService {
  private userRepo;
  constructor() {
    this.userRepo = UserRepo;
  }
  async register(data: IUser): Promise<IServiceResult<IToken>> {
    const { email, mobile, password } = data;
    const existUserByThisEmail: IRepoResult<IUser | null> =
      await this.userRepo.findOne({
        $or: [{ email }, { mobile }],
      });

    //Email already exists
    if (existUserByThisEmail.data) {
      return throwHttpError({
        message: "exist_this_email_or_mobile",
        status: 422,
      });
    }
    //   ** Add User
    //   New User Schema
    const newData = {
      ...data,
      password: await this.genrateHashedPassword(password),
    };
    const user: IRepoResult<IUser> = await this.userRepo.createOne(newData);
    const tokenData: IToken = this.userToken(user.data);
    const result: IServiceResult<IToken> = { data: tokenData };
    return result;
  }
  async login(body: IUserLogin): Promise<IServiceResult<IToken>> {
    const { emailOrMobile, password } = body;
    //find user by mobile
    const findUser: IRepoResult<IUser> = await this.userRepo.findOne(
      {
        $or: [
          {
            mobile: emailOrMobile,
          },
          {
            email: emailOrMobile,
          },
        ],
      },
      { select: "+password" }
    );
    if (!findUser) {
      return throwHttpError({ message: "not_fount", status: 404 });
    }

    const checkPassword = await bcryptjs.compare(
      password,
      findUser?.data?.password || ""
    );

    if (!checkPassword) {
      return throwHttpError({ message: "not_fount", status: 404 });
    }

    const tokenData: IToken = this.userToken(findUser.data);
    const result: IServiceResult<IToken> = { data: tokenData };
    return result;
  }
  async getNewTokenByUserId(id: string): Promise<IToken> {
    const findUser: IRepoResult<IUser> = await this.userRepo.findById(id);
    if (!findUser) {
      return throwHttpError({
        message: "not found user by this id",
        status: 500,
      });
    }
    const getNewToken = this.userToken(findUser.data);
    return getNewToken;
  }
  userToken(user: IGenerateUserToken): IToken {
    const jwtGenerateAccess = jwt.sign(
      {
        mobile: user?.mobile,
        email: user?.email,
        name: user?.name,
        _id: user?._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE }
    );
    const jwtGenerateRefresh = jwt.sign(
      {
        mobile: user?.mobile,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE }
    );
    const tokenData: IToken = {
      accessToken: jwtGenerateAccess,
      refreshToken: jwtGenerateRefresh,
    };
    return tokenData;
  }
  async findOne(query: Object): Promise<IServiceResult<IUser>> {
    const resultService: IServiceResult<IUser> = await this.userRepo.findOne(
      query
    );
    return resultService;
  }
  isAthorize(tokens: IToken): IServiceResult<IIsAuthurize> {
    let accessToken = tokens.accessToken;
    let refreshToken = tokens.refreshToken;

    let isAthorize = false;
    let user: IReqUser;
    if (accessToken || refreshToken) {
      try {
        jwt.verify(accessToken, process.env.JWT_SECRET);

        let userdecoded: any = jwt.decode(accessToken);

        user = userdecoded;
        isAthorize = true;
      } catch (err) {
        if (refreshToken) {
          try {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          } catch (error) {
            isAthorize = false;
          }
        } else {
          isAthorize = false;
        }
      }
    }

    const result: IServiceResult<IIsAuthurize> = {
      data: { isAthorize, user },
    };
    return result;
  }
  async genrateHashedPassword(password: string) {
    return await bcryptjs.hash(password, 12);
  }
}

export default new AuthService();
