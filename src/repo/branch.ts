import { MongoRepo } from "./repo";
import { BranchModel } from "../database/models/branch";
class BranchRepo extends MongoRepo {
  constructor() {
    super(BranchModel);
  }
}

export default new BranchRepo();
