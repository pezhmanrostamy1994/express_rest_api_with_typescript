import mongoose from "mongoose";
const connectToMongo = async () => {
  try {
    const uri = process.env.MONGO_DB_HOST;
    if (uri) {
      mongoose.connect(uri, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        autoIndex: true,
        useUnifiedTopology: true,
        // user: config.get('db').username,
        // pass: config.get('db').password,
        dbName: process.env.DB_NAME_DEV,
      });
      console.log(`connected to ${process.env.DB_NAME_DEV} DB...ready to use!`);
    } else {
      console.log("No MongoDB URI provided");
    }
  } catch (err) {
    console.error("could not connect to MongoDB...", err);
  }
};

export { connectToMongo };
