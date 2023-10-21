import { authConfig } from "./auth";
import { branchConfig } from "./branch";
import { categoryConfig } from "./category";
import { productConfig } from "./product";
import { userConfig } from "./user";
import { uploadConfig } from "./upload";
import { postConfig } from "./post";
import { messageConfig } from "./messages";

const swaggerBaseConfig: any = {
  openapi: "3.0.0",
  info: {},
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/`,
    },
  ],
  tags: [
    authConfig.tag,
    userConfig.tag,
    categoryConfig.tag,
    branchConfig.tag,
    productConfig.tag,
    uploadConfig.tag,
    postConfig.tag,
    messageConfig.tag
  ],
  paths: {
    ...authConfig.paths,
    ...userConfig.paths,
    ...categoryConfig.paths,
    ...branchConfig.paths,
    ...productConfig.paths,
    ...uploadConfig.paths,
    ...postConfig.paths,
    ...messageConfig.paths
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "Bearer",
      },
    },
    schemas: {},
  },
};
export default swaggerBaseConfig;
