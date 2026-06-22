//Users Model

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
//import validator for email and password validation
import validator from "validator";

//user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
//Adding a pre-save hook to the User model to encrypt/hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
//compare password if same or different while login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//export user model
export default mongoose.model("User", userSchema);
