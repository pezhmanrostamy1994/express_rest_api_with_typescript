import _, { find } from "lodash";
import UserRepo from "../../../repo/user";
import { IUser, IUserUpdateBody } from "../../../interfaces/user";
import { IReqUser } from "../../../interfaces/auth";
import AuthService from "../auth/auth";
class CategoryService {
  private userRepo;
  private authService;
  constructor() {
    this.userRepo = UserRepo;
    this.authService = AuthService;
  }
  public async getAll(query: any): Promise<IServiceResult<IUser[]>> {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.mobile) {
      queryDb.mobile = new RegExp(query.mobile);
    }
    const findCategoryByName: IRepoResult<IUser[]> =
      await this.userRepo.findPaginate(queryDb, {
        populate: [{ path: "branchs" }],
      });
    return findCategoryByName;
  }
  async getAllWithoutPaginate(
    query: any
  ): Promise<IServiceResult<Array<IUser>>> {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.mobile) {
      queryDb.mobile = new RegExp(query.mobile);
    }
    const getAllBranch = await this.userRepo.find(queryDb);
    return getAllBranch;
  }
  async getById(id: string): Promise<IServiceResult<IUser>> {
    const getDataById = await this.userRepo.findById(id);
    return getDataById;
  }
  async geMe(user: IReqUser): Promise<IServiceResult<IUser>> {
    let query = { mobile: user.mobile };
    const getData = await this.getOne(query);
    return getData;
  }
  async getOne(query: any): Promise<IServiceResult<IUser>> {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.mobile) {
      queryDb.mobile = new RegExp(query.mobile);
    }
    const getDataById = await this.userRepo.findOne(queryDb);
    return getDataById;
  }
  async update(
    id: string,
    body: IUserUpdateBody
  ): Promise<IServiceResult<IUser>> {
    const { newPassword } = body;

    const findUser: any = await this.userRepo.findById(id);
    const findUserData = findUser.data;
    if (newPassword) {
      findUserData.password = await this.authService.genrateHashedPassword(
        newPassword
      );
    }
    _.assign(findUserData, body);
    const updatedUser = await findUserData.save();
    return updatedUser;
  }
}

export default new CategoryService();
