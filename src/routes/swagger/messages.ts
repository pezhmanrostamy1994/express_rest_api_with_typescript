import { BASE_UL } from "../../utils/const";
import feilds from "./feilds/index";
const v1 = "v1";
const tag = BASE_UL.MESSAGES;
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
      summary: "get all",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [],
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
  [`/${v1}/${tag}/getAllUnSeen`]: {
    get: {
      tags: [tag],
      summary: "get all unSeen",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [],
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
  [`/${v1}/${tag}/seenMessages`]: {
    put: {
      tags: [tag],
      summary: " ",
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
                ids: feilds.ids({
                  required: true,
                }),
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
};

export const messageConfig = {
  tag,
  components,
  paths,
};
