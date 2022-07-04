import mongoose from "mongoose";

export const connect = async () => {

  const MONGO_URL =
    process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'staging'
      ? process.env.MONGO_DATABASE_URL
      : process.env.MONGO_DATABASE_URL_LOCAL

  await mongoose.connect(MONGO_URL!);

  return Promise.resolve(mongoose);
}
