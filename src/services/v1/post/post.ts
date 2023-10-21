import { BASE_UL, ROLES, STATUS } from "../../../utils/const";
import { IPost } from "../../../interfaces/post";
import PostRepo from "../../../repo/post";
import CategoryService from "../category/category";
import MessageService from "../message/message";
import { IReqUser } from "../../../interfaces/auth";
import { stringToMongoObjectId } from "../../../utils/helper";
import { throwHttpError } from "../../../utils/error";
class PostService {
  private postRepo;
  private categoryService;
  private messageService;
  constructor() {
    this.postRepo = PostRepo;
    this.categoryService = CategoryService;
    this.messageService = MessageService;
  }
  async search(query: any): Promise<IServiceResultPaginate<Array<IPost>>> {
    const { name, category, city, province, priceTo, priceFrom, deepPath } =
      query;
    const queryDb: any = { status: STATUS.ACTIVE.value };

    if (name) {
      queryDb["$text"] = { $search: name };
    }
    if (category) {
      queryDb.categories = { $in: [category] };
    }
    if (city) {
      queryDb.city = city;
    }
    if (province) {
      queryDb.province = province;
    }
    if (priceFrom) {
      queryDb.price = {};
      queryDb.price["$gte"] = +priceFrom;
    }
    if (priceTo) {
      if (!queryDb.price) {
        queryDb.price = {};
      }
      queryDb.price["$lte"] = +priceTo;
    }
    if (deepPath) {
      queryDb.paths = new RegExp(deepPath);
    }
    const populate = [
      {
        path: "user",
        select: "mobile",
      },
    ];
    const getAllBranch = await this.postRepo.findPaginate(queryDb, {
      ...query,
      populate,
      lean: true,
    });

    return getAllBranch;
  }
  async getAll(query: any): Promise<IServiceResultPaginate<Array<IPost>>> {
    query.status = STATUS.ACTIVE.value;
    const queryDb: any = this.parsQueryDbForGetAllPost(query);
    const populate = [
      {
        path: "user",
        select: "mobile",
      },
    ];
    const getAllBranch = await this.postRepo.findPaginate(queryDb, {
      ...query,
      populate,
    });

    return getAllBranch;
  }

  async getAllSimilarity(id: string): Promise<IServiceResult<Array<IPost>>> {
    const findPost = await this.postRepo.findById(id);
    const getAllBranch = await this.postRepo.find(
      {
        categories: { $in: findPost.data.categories },
        _id: { $ne: stringToMongoObjectId(id) },
      },
      { limit: 20 }
    );

    return getAllBranch;
  }
  async getMain(query: any): Promise<IServiceResultPaginate<Array<IPost>>> {
    const queryDb: any = this.parsQueryDbForGetAllPost(query);
    const populate = [
      {
        path: "user",
        select: "mobile",
      },
    ];
    const getAllBranch = await this.postRepo.findPaginate(queryDb, {
      ...query,
      populate,
    });

    return getAllBranch;
  }
  async getAllWithoutPaginate(
    query: any
  ): Promise<IServiceResult<Array<IPost>>> {
    const queryDb: any = this.parsQueryDbForGetAllPost(query);
    const getAllBranch = await this.postRepo.find(queryDb);
    return getAllBranch;
  }
  async getById(id: string): Promise<IServiceResult<IPost>> {
    const getDataById = await this.postRepo.findById(id);
    return getDataById;
  }

  async createOne(body: IPost, user: IReqUser): Promise<IServiceResult<IPost>> {
    const { categories } = body;
    if (user.role !== ROLES.ADMIN.value) {
      body.status = STATUS.PENDING.value;
    }
    const getAllPaths = await this.getAllPathForArrayOfCategories(categories);
    body.paths = getAllPaths;
    body.user = user._id;
    const newData: IRepoResult<IPost> = await this.postRepo.createOne(body);
    return newData;
  }
  private async getAllPathForArrayOfCategories(
    categories: Array<string>
  ): Promise<string[]> {
    const categoriesConvertToObjectId = stringToMongoObjectId(categories);
    const findCategories = await this.categoryService.getAllWithoutPaginate({
      _id: { $in: categoriesConvertToObjectId },
    });

    let paths: Array<string> = [];
    findCategories.data.map((item: any) => {
      if (item.paths) {
        paths = [...paths, ...item.paths];
      }
    });
    return [...new Set(paths)];
  }
  async updateOne(
    id: string,
    body: IPost,
    userRole: string
  ): Promise<IServiceResult<IPost>> {
    const { categories } = body;
    if (userRole !== ROLES.ADMIN.value) {
      body.status = STATUS.PENDING.value;
    }
    const findPost = await PostRepo.findById(id);
    if (String(findPost.data.categories) !== String(categories)) {
      const getAllPaths = await this.getAllPathForArrayOfCategories(categories);
      body.paths = getAllPaths;
    }

    const updatedData: IRepoResult<IPost> = await this.postRepo.updateOne(
      { _id: id },
      body
    );
    return updatedData;
  }
  async updatePostStatus(
    id: string,
    body: IPost
  ): Promise<IServiceResult<IPost>> {
    const updatedData: IRepoResult<IPost> =
      await this.postRepo.findOneAndUpdate({ _id: id }, body);
    if (!updatedData.data) {
      return throwHttpError({
        message: "داده ای با این ای دی موجود نیست",
        status: 404,
      });
    }

    let message: string = body.adminMessage;
    if (!message) {
      if (body.status === STATUS.ACTIVE.value) {
        message = "پست شما با موفقیت تایید شد";
      } else {
        message = "پست شما رد شد";
      }
    }

    await this.messageService.create({
      message,
      pathId: updatedData.data._id,
      baseUrl: BASE_UL.MESSAGES,
      to: updatedData.data.user,
    });

    return updatedData;
  }
  async updateImages(body: any, user: IReqUser) {}
  private parsQueryDbForGetAllPost(query: any) {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.status) {
      queryDb.status = query.status;
    }
    if (query.user) {
      queryDb.user = query.user;
    }
    return queryDb;
  }
}

export default new PostService();
