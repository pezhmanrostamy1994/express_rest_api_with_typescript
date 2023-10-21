// import { Property, Config } from "ts-convict";
// import SubConfig from "./SubConfig";
// import Database from "./Database";
// import * as yaml from "js-yaml";
// import { url, ipaddress } from "convict-format-with-validator";

// @Config({
//   // optional default file to load, no errors if it doesn't exist
//   file: "config.yml", // relative to NODE_PATH or cwd()

//   // optional parameter. Defaults to 'strict', can also be 'warn' or 'skip'
//   validationMethod: "strict",

//   // optionally add parsers like yaml or toml
//   parser: {
//     extension: ["yml", "yaml"],
//     parse: yaml.safeLoad,
//   },

//   //optional extra formats to use in validation
//   formats: {
//     url,
//     ipaddress,
//   },
// })
// export class MyConfig implements config.MyConfig {
//   // ts-convict will use the Typescript type if no format given
//   @Property({
//     doc: "The name of the thing",
//     default: "Convict",
//     env: "MY_CONFIG_NAME",
//   })
//   public name: string;

//   @Property(SubConfig)
//   public subConfig: config.SubConfig;

//   @Property(Database)
//   public db: config.Database;
// }
