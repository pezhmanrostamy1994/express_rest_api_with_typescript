import { BASE_UL } from "../../utils/const";
import feilds from "./feilds";
const v1 = "v1";
const tag = BASE_UL.BRANCH;
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
      summary: "get all branch whit paginate",
      security: [
        {
          bearer: "Auth",
        },
      ],
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
    post: {
      tags: [tag],
      summary: "create branch",
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
                faceBook: feilds.faceBook({}),
                telegram: feilds.telegram({}),
                instagram: feilds.instagram({}),
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
  [`/${v1}/${tag}/me`]: {
    get: {
      tags: [tag],
      summary: "get all my branch ",
      security: [
        {
          bearer: "Auth",
        },
      ],
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
  [`/${v1}/${tag}/withoutPaginate`]: {
    get: {
      tags: [tag],
      summary: "get all branch without paginate",
      security: [
        {
          bearer: "Auth",
        },
      ],
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
                  success: true,
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
      summary: "search text to branch",
      security: [],
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
    put: {
      tags: [tag],
      summary: "update branch",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [feilds.id({ in: "path" })],
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
      summary: "update branchs status",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [feilds.id({ in: "path" })],
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

export const branchConfig = {
  tag,
  components,
  paths,
};
