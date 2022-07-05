import "dotenv/config";
import mongoose from "mongoose";
import { UserModel } from "../core/src/modules/user/models/User";
import { UserRole } from "../core/src/common/Constants";
import { hashPasswd } from "../core/src/common/util/Bcrypt";

const users = [
  new UserModel({
    username: "admin",
    password: hashPasswd("admin"),
    role: UserRole.ADMIN,
    name: "Admin",
    email: "admin@email.com",
    phone: "123456789",
  }),
  new UserModel({
    username: "user",
    password: hashPasswd("user"),
    role: UserRole.USER,
    name: "User",
    email: "user@email.com",
    phone: "123456789",
  }),
];

try {
  mongoose.connect(process.env.MONGO_DATABASE_URL_LOCAL || "mongodb://localhost:27017/deall")
  .then(() => {
    console.log("connected to db in development environment");
  })
} catch (err) {
  console.log(err.stack);
  process.exit(1);
}

users.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === users.length - 1) {
      console.log("Seeding Completed!");
      mongoose.disconnect();
    }
  });
});
