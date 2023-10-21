import { BASE_UL } from "../../utils/const";
import feilds from "./feilds";
const v1 = "v1";
const tag = BASE_UL.UPLOADS;
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
    post: {
      tags: [tag],
      summary: "upload users",
      security: [
        {
          bearer: "Auth",
        },
      ],
      parameters: [],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: feilds.file({
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
                  data: "file-1690923381703.png",
                  success: true,
                  message: "عملیات با موفقیت انجام شد",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const uploadConfig = {
  tag,
  components,
  paths,
};
