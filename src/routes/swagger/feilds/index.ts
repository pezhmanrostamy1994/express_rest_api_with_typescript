import { CATEGORY_TYPE, CITIES, PROVINCES, STATUS } from "../../../utils/const";
const statusEnum = Object.values(STATUS).map((item) => item.value);
const categoryTypeEnum = Object.values(CATEGORY_TYPE).map((item) => item.value);
const parsToSwaggerFormat = (cnf: any) => {
  const {
    parameterIn,
    format,
    required,
    description,
    example,
    items,
    schema,
    enums,
    type,
    name,
  } = cnf;
  if (["path", "query"].includes(parameterIn)) {
    return {
      in: parameterIn,
      name,
      schema: schema
        ? schema
        : {
            type: type || "string",
            items: items || {},
            enum: enums,
            format: format || "string",
          },
      required: required || false,
      description: description || "",
      example: example,
    };
  } else {
    return cnf;
  }
};

const feilds = {
  status: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "status",
      type: "string",
      enum: statusEnum,
      example: STATUS.ACTIVE.value,
      ...newOpt,
    }),
  adminMessage: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "adminMessage",
      type: "string", 
      ...newOpt,
    }),
  ids: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "ids",
      type: "array",
      example: ["_id"],
      ...newOpt,
    }),
  faceBook: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "faceBook",
      type: "string",
      ...newOpt,
    }),

  instagram: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "instagram",
      type: "string",
      ...newOpt,
    }),
  telegram: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "telegram",
      type: "string",
      ...newOpt,
    }),
  optionalInputs: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "optionalInputs",
      type: "array",
      example: [{ name: "رنگ", inputName: "color", value: "آبی" }],
      ...newOpt,
    }),
  images: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "images",
      type: "array",
      example: [],
      ...newOpt,
    }),
  isShow: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "isShow",
      type: "boolean",
      ...newOpt,
    }),
  price: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "price",
      type: "number",
      ...newOpt,
    }),
  categoryType: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "categoryType",
      type: "string",
      enum: categoryTypeEnum,
      example: CATEGORY_TYPE.PRODUCT.value,
      ...newOpt,
    }),
  location: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "location",
      type: "object",
      properties: {
        long: {
          type: "number",
        },
        lat: {
          type: "number",
        },
      },
      ...newOpt,
    }),
  main: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "main",
      type: "boolean",
      ...newOpt,
    }),
  expirationDate: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "expirationDate",
      type: "string",
      example: "2023-12-12",
      ...newOpt,
    }),
  registerDate: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "registerDate",
      type: "string",
      example: "2023-12-12",
      ...newOpt,
    }),
  tags: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "tags",
      type: "array",
      example: [],
      ...newOpt,
    }),
  file: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "file",
      type: "file",
      ...newOpt,
    }),
  parents: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "parents",
      type: "array",
      example: [],
      ...newOpt,
    }),
  categories: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "categories",
      type: "array",
      example: [],
      desciption: "array of id",
      ...newOpt,
    }),
  password: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "password",
      type: "string",
      example: "Q123456789p",
      ...newOpt,
    }),
  newPassword: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "newPassword",
      type: "string",
      example: "Q123456789p",
      ...newOpt,
    }),
  token: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "token",
      type: "string",
      description: "set refresh token",
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk0M2IxMTNiM2NlMjFjZDQxY2UwYTIiLCJtb2JpbGUiOiIwOTMwODgxNTEwOCIsIm5hdGlvbmFsSWQiOiIyMTcwMjM4NjU0IiwiaWF0IjoxNjcxMDE1OTI1LCJleHAiOjE2NzEwMTY4MjV9.TnlqU4kumlsjj6r9geesKTZgDbGofcWAe4JWgjEwtlU"',
      ...newOpt,
    }),

  gender: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "gender",
      type: "string",
      example: "",
      description: "جنسیت",
      ...newOpt,
    }),

  email: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "email",
      type: "string",
      example: "emai@gmail.com",
      ...newOpt,
    }),

  profileImage: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "profileImage",
      type: "string",
      example: "",
      description: "تصویر پروفایل کاربری ",
      ...newOpt,
    }),

  code: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "code",
      type: "string",
      example: "23923",
      ...newOpt,
    }),
  id: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "id",
      type: "string",
      example: "62d08c33f006bca35abeddb0",
      ...newOpt,
    }),
  user: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "user",
      type: "string",
      example: "62d08c33f006bca35abeddb0",
      ...newOpt,
    }),
  userMobile: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "userMobile",
      type: "string",
      example: "09308815108",
      ...newOpt,
    }),
  limit: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "limit",
      type: "string",
      example: "10",
      ...newOpt,
    }),
  sort: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "sort",
      type: "string",
      example: "-shamsiCreatedAt",
      description: "- means descending",
      ...newOpt,
    }),
  select: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "select",
      type: "string",
      example: "name createdAt _id",
      ...newOpt,
    }),

  page: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "page",
      type: "string",
      example: "1",
      ...newOpt,
    }),
  branchName: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "branchName",
      type: "string",
      example: "branch",
      ...newOpt,
    }),
  branchCode: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "branchCode",
      type: "string",
      example: "93928374",
      ...newOpt,
    }),
  mobile2: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "mobile2",
      type: "string",
      example: "09308815108",
      ...newOpt,
    }),
  mobile: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "mobile",
      type: "string",
      example: "09308815108",
      ...newOpt,
    }),
  emailOrMobile: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "emailOrMobile",
      type: "string",
      example: "09308815108",
      description: "enter email or mobile",
      ...newOpt,
    }),
  newMobile: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "newMobile",
      type: "string",
      example: "09308815108",
      ...newOpt,
    }),
  mobile_rgx: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "mobile_rgx",
      type: "string",
      example: "079",
      ...newOpt,
    }),
  province: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "province",
      type: "string",
      example: PROVINCES[0].name,
      ...newOpt,
    }),
  priceFrom: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "priceFrom",
      type: "number",
      example: 0,
      ...newOpt,
    }),

  priceTo: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "priceTo",
      type: "number",
      example: 2000000,
      ...newOpt,
    }),
  deepPath: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "deepPath",
      type: "string",
      example: "1689944608770",
      description: "this feild is category code",
      ...newOpt,
    }),
  firstName: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "firstName",
      type: "string",
      example: "امید",
      ...newOpt,
    }),
  lastName: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "lastName",
      type: "string",
      example: "شایان",
      ...newOpt,
    }),
  nikName: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "nikName",
      type: "string",
      example: "arya",
      ...newOpt,
    }),
  name: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "name",
      type: "string",
      example: "arya",
      ...newOpt,
    }),
  name_rgx: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "name_rgx",
      type: "string",
      example: "name_rgx",
      ...newOpt,
    }),
  value: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "value",
      type: "string",
      example: "value",
      ...newOpt,
    }),

  telegramId: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "telegramId",
      type: "string",
      example: "telegramId",
      ...newOpt,
    }),
  whatsAppId: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "whatsAppId",
      type: "string",
      example: "whatsAppId",
      ...newOpt,
    }),
  address: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "address",
      type: "string",
      example: "",
      ...newOpt,
    }),
  fromDate: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "fromDate",
      type: "string",
      example: "",
      ...newOpt,
    }),
  toDate: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "toDate",
      type: "string",
      example: "",
      ...newOpt,
    }),

  description: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "description",
      type: "string",
      example: "description",
      ...newOpt,
    }),
  city: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "city",
      type: "string",
      example: CITIES[0].name,
      ...newOpt,
    }),

  otherMobiles: (newOpt: any) =>
    parsToSwaggerFormat({
      name: "otherMobiles",
      type: "array",
      description: "شماره تماس های دیگر",
      ...newOpt,
    }),
};

export default feilds;
