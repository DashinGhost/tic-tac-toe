const User = require("../models/userModel");
const catchAsync = require("../utils/cathcAsync");

const createOrUpdateUser = async (email, name) => {
  try {
    const filter = { _id: email };
    const update = {
      $set: {
        name: name,
      },
    };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true};
    const result = await User.updateOne(filter, update, options);
    console.log("UPSERT RES", result);

    console.log(
      result.nModified === 0
        ? "User created or already exists."
        : "User updated."
    );
  } catch (error) {
    console.error("Error creating or updating user:", error);
  }
};

const addUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { startTime, name1, email1, name2, email2 } = req.body;
  const gameId = email1 + "#" + email2 + "#" + startTime;
  await createOrUpdateUser(email1, name1);
  await createOrUpdateUser(email2, name2);
  res.status(200).json({
    status: "success",
    data: {
      gameId,
    },
  });
});

const getUsersData = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const { email1, email2 } = req.query;
  const user1 = await User.findById(email1);
  const user2 = await User.findById(email2);
  res.status(200).json({
    status: "success",
    data: {
      user1,
      user2,
    },
  });
});

module.exports = {
  addUser,
  getUsersData,
};
