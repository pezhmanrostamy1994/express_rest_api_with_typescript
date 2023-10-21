import { BASE_UL } from "../../utils/const";
import feilds from "./feilds";
const v1 = "v1";
const tag = BASE_UL.POSTS;
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
      summary: "get all post whit paginate",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [
        feilds.page({ in: "query" }),
        feilds.limit({ in: "query" }),
        feilds.name({ in: "query" }),
        feilds.status({ in: "query" }),
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
      summary: "create post",
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
                price: feilds.price({}),
                city: feilds.city({
                  required: true,
                }),
                province: feilds.province({
                  required: true,
                }),
                categories: feilds.categories({}),
                optionalInputs: feilds.optionalInputs({}),
                isShow: feilds.isShow({}),
                description: feilds.description({ required: true }),
                images: feilds.images({}),
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
  [`/${v1}/${tag}/search`]: {
    get: {
      tags: [tag],
      summary: "search text to post",
      security: [],
      parameters: [
        feilds.page({ in: "query" }),
        feilds.limit({ in: "query" }),
        feilds.name({ in: "query" }),
        feilds.categories({ in: "query" }),
        feilds.city({ in: "query" }),
        feilds.province({ in: "query" }),
        feilds.priceFrom({ in: "query" }),
        feilds.priceTo({ in: "query" }),
        feilds.deepPath({ in: "query" }),
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
  },
  [`/${v1}/${tag}/mine`]: {
    get: {
      tags: [tag],
      summary: "my posts",
      security: [],
      parameters: [
        feilds.page({ in: "query" }),
        feilds.limit({ in: "query" }),
        feilds.name({ in: "query" }),
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
  },
  [`/${v1}/${tag}/{id}/similarity`]: {
    get: {
      tags: [tag],
      summary: "get all similarirty posts",
      parameters: [],
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
  [`/${v1}/${tag}/{id}`]: {
    get: {
      tags: [tag],
      summary: "get one by id",
      security: [],
      parameters: [],
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
    put: {
      tags: [tag],
      summary: "update post",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [feilds.id({ in: "path", required: true })],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: feilds.name({
                  required: true,
                }),
                price: feilds.price({}),
                province: feilds.province({
                  required: true,
                }),
                city: feilds.city({
                  required: true,
                }),
                categories: feilds.categories({}),
                description: feilds.description({ required: true }),
                isShow: feilds.isShow({}),
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
  [`/${v1}/${tag}/status/{id}`]: {
    put: {
      tags: [tag],
      summary: "update post status",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [feilds.id({ in: "path", required: true })],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: feilds.status({}),
                adminMessage: feilds.adminMessage({}),
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
};

export const postConfig = {
  tag,
  components,
  paths,
};
