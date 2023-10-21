import feilds from "./feilds/index";
import { BASE_UL } from "../../utils/const";
const tag = BASE_UL.AUTH;
const v1 = "v1";

const components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "Bearer",
    },
  },
};
const paths: any = {
  [`/${v1}/${tag}/register`]: {
    post: {
      tags: [tag],
      summary: "get new token by refresh token",
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
                mobile: feilds.mobile({
                  required: true,
                }),
                email: feilds.email({
                  required: true,
                }),
                password: feilds.password({
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
                  success: true,
                  data: {
                    accessToken:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzc0YjM4MmY1OGQ4ZTI0OGNkOTNiNGQiLCJtb2JpbGUiOiIwOTMwODgxNTEwOCIsImlhdCI6MTY2ODU5MjUxNCwiZXhwIjoxNjY4NTkzNDE0fQ.eBFd6vkwx4nN8kJKIRFuGQx6up-GEUStpg1gklhYFXc",
                    success: true,
                    message: "ثبت نلم با موفقیت انجام شد",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  [`/${v1}/${tag}/login`]: {
    post: {
      tags: [tag],
      summary: "login",
      security: [],
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                emailOrMobile: feilds.emailOrMobile({
                  required: true,
                }),
                password: feilds.password({
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
                  success: true,
                  data: {
                    success: true,
                    message: "ورود با موفقیت انجام شد",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  [`/${v1}/${tag}/isAutorize`]: {
    get: {
      tags: [tag],
      summary: "check user is login ",
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
                  success: true,
                  data: {
                    isAutorize: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const authConfig = {
  tag,
  components,
  paths,
};
