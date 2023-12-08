const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //   return emailRegex.test(value);
        return true;
        },
        message: "Invalid email format",
      },
    },
    name: {
      type: String,
      required: true,
    },
    wins: {
      type: Number,
      default: 0,
    },
    looses: {
      type: Number,
      default: 0,
    },
    draws: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("totalGames").get(function () {
  return this.wins + this.looses + this.draws;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
