import { BASE_UL } from "../../utils/const";
import feilds from "./feilds/index";
const v1 = "v1";
const tag = BASE_UL.CATEGORY;
const components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "Bearer",
    },
  },
};
const paths: any = {
  [`/${v1}/${tag}`]: {
    get: {
      tags: [tag],
      summary: "get all categories with paginate",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [
        feilds.name({ in: "query" }),
        feilds.categoryType({ in: "query" }),
      ],
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  data: [],
                  page: 1,
                  limit: 20,
                  totalDocs: 0,
                  totalPages: 0,
                  success: true,
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: [tag],
      summary: "create category",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: feilds.name({
                  required: true,
                }),
                status: feilds.status({
                  required: true,
                }),
                parents: feilds.parents({
                  required: true,
                }),
                categoryType: feilds.categoryType({
                  required: true,
                }),
                optionalInputs: feilds.optionalInputs({}),
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  success: true,
                  data: {},
                },
              },
            },
          },
        },
      },
    },
  },
  [`/${v1}/${tag}/withoutPaginate`]: {
    get: {
      tags: [tag],
      summary: "get all categories without paginate",
      security: [],
      parameters: [
        feilds.name({ in: "query" }),
        feilds.categoryType({ in: "query" }),
      ],
      requestBody: {},
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  data: [],
                  success: true,
                },
              },
            },
          },
        },
      },
    },
  },
  [`/${v1}/${tag}/{id}`]: {
    get: {
      tags: [tag],
      summary: "get one by id",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [feilds.id({ in: "path" })],
      requestBody: {},
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  data: {},
                  success: true,
                },
              },
            },
          },
        },
      },
    },
  },
};

export const categoryConfig = {
  tag,
  components,
  paths,
};
