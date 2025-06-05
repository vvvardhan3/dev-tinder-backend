const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid!" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
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
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL" + value);
        }
      },
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

/**
 *  User Schema Helper Methods
 */

userSchema.methods.getJWT = function () {
  /**
   * This method generates a JWT token for the user.
   * It uses the user's ID and a secret key to sign the token.
   * The token is only valid for 1 day.
   */

  const user = this;

  const token = jwt.sign({ _id: user._id }, "VISHnu@1107", { expiresIn: "1h" });

  return token;
};

userSchema.methods.validatePassword = async function (Inputpassword) {
  /**
   * This method validates the password provided by the user.
   * It compares the input password with the user's stored password inside the database.
   * If the passwords matchs, it returns true, otherwise false.
   */
  const user = this;
  const isPasswordValid = await bcrypt.compare(Inputpassword, user.password);
  return isPasswordValid;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
