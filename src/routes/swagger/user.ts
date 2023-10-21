import { BASE_UL } from "../../utils/const";
import feilds from "./feilds";
const v1 = "v1";
const tag = BASE_UL.USER;
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
      summary: "get all users whit paginate",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [
        feilds.name({ in: "query" }),
        feilds.mobile({ in: "query" }),
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
      summary: "get all user without paginate",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [
        feilds.name({ in: "query" }),
        feilds.mobile({ in: "query" }),
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
  [`/${v1}/${tag}/user`]: {
    get: {
      tags: [tag],
      summary: "get one user",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [
        feilds.name_rgx({ in: "query" }),
        feilds.mobile_rgx({ in: "query" }),
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
  [`/${v1}/${tag}/me`]: {
    get: {
      tags: [tag],
      summary: "get me",
      security: [
        {
          bearer: "Auth",
        },
      ],
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
      summary: "update me",
      security: [],
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
                newPassword: feilds.newPassword({}),
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
  [`/${v1}/${tag}/{id}`]: {
    get: {
      tags: [tag],
      summary: "get one user",
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

export const userConfig = {
  tag,
  components,
  paths,
};
