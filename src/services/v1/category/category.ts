import { throwHttpError } from "../../../utils/error";
import CategoryRepo from "../../../repo/category";
import { ICategory } from "../../../interfaces/catgeory";
import { Types } from "mongoose";
import { mongoObjectId } from "../../../types/mongoose";
interface ICreateCategory {
  name: string;
  parents?: Array<Types.ObjectId>;
}
class CategoryService {
  private categoryRepo;
  constructor() {
    this.categoryRepo = CategoryRepo;
  }
  public async getAll(query: any): Promise<IServiceResult<ICategory[]>> {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.categoryType) {
      queryDb.categoryType = new RegExp(query.categoryType);
    }
    const findCategoryByName: IRepoResult<ICategory[]> =
      await this.categoryRepo.findPaginate(queryDb, {
        populate: [{ path: "parents" }],
      });
    return findCategoryByName;
  }
  public async getAllWithoutPaginate(
    query: any
  ): Promise<IServiceResult<Array<ICategory>>> {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.categoryType) {
      queryDb.categoryType = new RegExp(query.categoryType);
    }
    if (query._id) {
      queryDb._id = query._id;
    }
    const getAllBranch = await this.categoryRepo.find(queryDb, {
      populate: [{ path: "parents" }],
    });
    return getAllBranch;
  }
  async getAllById(id: mongoObjectId) {
    const data: IRepoResult<ICategory> = await this.categoryRepo.findById(id, {
      populate: [{ path: "children" }],
    });
    return data;
  }
  public async create(
    body: ICreateCategory
  ): Promise<IServiceResult<ICategory>> {
    const { name, parents } = body;

    const findCategoryByName = await this.categoryRepo.findOne({
      name,
    });

    if (findCategoryByName.data) {
      return throwHttpError({
        message: "نام دسته بندی تکراری است",
        status: 422,
      });
    }

    const code: string = String(new Date().getTime());
    let paths: Array<string> = [code];

    for (let index = 0; index < parents?.length; index++) {
      const categoryId: Types.ObjectId = parents[index];
      const findParent: IRepoResult<ICategory> =
        await this.categoryRepo.findById(categoryId);

      if (!findParent) {
        return throwHttpError({
          message: "not found parent category by this id",
          status: 422,
        });
      }

      if (findParent.data?.paths?.length) {
        findParent.data?.paths.map((item: string) => {
          const path: string = `${item}/${code}`;
          paths = [...paths, path];
        });
      } else {
        const path: string = `${findParent.data?.code}/${code}`;
        paths = [...paths, path];
      }
    }

    const bodyForCreate: any = {
      ...body,
      paths,
      code,
    };
    const data: IRepoResult<ICategory> = await this.categoryRepo.createOne(
      bodyForCreate
    );

    return data;
  }
  public async updateOne(
    body: ICreateCategory,
    id: mongoObjectId
  ): Promise<IServiceResult<ICategory>> {
    const { name, parents } = body;

    const findCategoryById: IRepoResult<ICategory | null> =
      await this.categoryRepo.findById(id);
    const findCategoryByIdData = findCategoryById.data;
    if (!findCategoryByIdData) {
      return throwHttpError({
        message: "not found data by this id",
        status: 404,
      });
    }

    if (name !== findCategoryByIdData.name) {
      const findCategoryByName = await this.categoryRepo.findOne({
        query: { name },
      });
      const findCategoryByNameData = findCategoryByName.data;
      //CATEGORY NAME MUST BE UNIQUE
      if (
        findCategoryByNameData &&
        String(findCategoryByNameData?._id) !== String(id)
      ) {
        return throwHttpError({
          message: "name is already registered",
          status: 422,
        });
      }
    }

    let paths: Array<string> = [findCategoryByIdData.code];

    //EXIST PARENT BY THIS ID
    for (let index = 0; index < parents?.length; index++) {
      const categoryId = parents[index];
      const findParent = await this.categoryRepo.findById(categoryId);
      const findParentData = findParent.data;
      if (!findParentData) {
        return throwHttpError({
          message: "not found parent category by this id",
          status: 422,
        });
      }

      if (findParentData.paths?.length) {
        findParentData.paths.map((item) => {
          const path: string = `${item}/${findCategoryByIdData.code}`;
          paths = [...paths, path];
        });
      } else {
        const path = `${findParentData.code}/${findCategoryByIdData.code}`;
        paths = [...paths, path];
      }
    }

    const data = await this.categoryRepo.updateOne(
      { _id: id },
      {
        ...body,
        paths,
      }
    );

    return data;
  }
}

export default new CategoryService();
