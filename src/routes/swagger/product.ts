import { BASE_UL } from "../../utils/const";
import feilds from "./feilds";
const v1 = "v1";
const tag = BASE_UL.PRODUCT;
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
      summary: "get all product whit paginate",
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
      summary: "create product",
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
                branchCode: feilds.branchCode({
                  required: true,
                }),
                price: feilds.price({}),
                city: feilds.city({
                  required: true,
                }),
                categories: feilds.categories({
                  required: true,
                }),
                description: feilds.description({}),
                status: feilds.status({}),
                expirationDate: feilds.expirationDate({}),
                registerDate: feilds.registerDate({}),
                main: feilds.main({}),
                location: feilds.location({}),
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
      summary: "search text to product",
      security: [],
      parameters: [
        feilds.page({ in: "query" }),
        feilds.limit({ in: "query" }),
        feilds.name({ in: "query" }),
        feilds.categories({ in: "query" }),
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
  [`/${v1}/${tag}/withoutPaginate`]: {
    get: {
      tags: [tag],
      summary: "get all product without paginate",
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
      summary: "update product",
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
                userMobile: feilds.userMobile({
                  required: true,
                }),
                nikName: feilds.nikName({}),
                mobile: feilds.mobile({
                  required: true,
                }),
                mobile2: feilds.mobile2({
                  required: true,
                }),
                address: feilds.address({}),
                tags: feilds.tags({}),
                city: feilds.city({
                  required: true,
                }),
                categories: feilds.categories({
                  required: true,
                }),
                description: feilds.description({}),
                status: feilds.status({}),
                expirationDate: feilds.expirationDate({}),
                registerDate: feilds.registerDate({}),
                main: feilds.main({}),
                location: feilds.location({}),
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
      summary: "update products status",
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
                status: feilds.status({}),
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

export const productConfig = {
  tag,
  components,
  paths,
};
