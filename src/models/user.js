const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
      validate(value) {
        if (value.length < 2) {
          throw new Error("First name must be at least 2 characters long!");
        }
      },
      lowercase: true,
    },
    lastName: {
      type: String,
      maxLength: 50,
      trim: true,
      lowercase: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if(!validator.isEmail(value)){
          throw new Error("Email is not valid!" + value)
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a strong password: " + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://example.com/default-profile.png",
      validate(value) {
        if(!validator.isURL(value)){
          throw new Error("Invalid photo URL" + value)
        }
      }
    },
    about: {
      type: String,
      default: "This is new about section",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
