const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const Item = require('../models/items.model')

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  // try {
  const { tokenDoc, registerData } = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
  await Token.deleteMany({ user: tokenDoc.user, type: tokenTypes.VERIFY_EMAIL });
  await userService.createUser(registerData);
  // await userService.updateUserById(user.id, { isEmailVerified: true });
  // } catch (error) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  // }
};

//NEW..

const verifyRole = async (verifyRoleToken) => {
  try {
    const verifyRoleTokenDoc = await tokenService.verifyToken(verifyRoleToken, tokenTypes.VERIFY_ROLE);
    const user = await userService.getUserById(verifyRoleTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_ROLE });
    await userService.updateUserById(user.id, { role: "admin" });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};


const verifyClose = async (verifyCloseToken) => {
  try {
    const verifyCloseTokenDoc = await tokenService.verifyToken(verifyCloseToken, tokenTypes.VERIFY_CLOSE_ACC);
    const user = await userService.getUserById(verifyCloseTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_CLOSE_ACC });
    // await userService.updateUserById(user.id, { role: "admin" });
    await userService.deleteUserById(user.id);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

const setPhone_Number = async (_request) => {
  try {
    if (!_request.user) {
      throw new Error();
    }
    await userService.updateUserById(_request.user.id, { Phone_Number: _request.body.Phone_Number });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Phone_Number verification failed');
  }
}

const createItem = async (_request) => {
  try {
    const newItem = new Item({
      ..._request.body,
      owner: _request.user.id
    })
    await newItem.save()
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Items failed');
  }
}

const fetchItem = async (itemId) => {
  try {
    const item = await Item.findOne({ _id: itemId })
    if (!item) {
      throw new Error();
    }
    return item
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Items failed');
  }
}

const fetchAllItem = async () => {
  try {
    const items = await Item.find({})
    return items
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Items failed');
  }
}

const updateItem = async (itemId, updateItem) => {
  const updates = Object.keys(updateItem)
  const allowedUpdates = ['item_name', 'item_description', 'item_category', 'item_price']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    throw new Error();
  }
  try {
    const item = await Item.findOne({ _id: itemId })
    if (!item) {
      throw new Error();
    }
    updates.forEach((update) => item[update] = updateItem[update])
    await item.save();
    return item
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Item Updates Errors!');
  }
}

const deleteItem = async (itemId) => {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: itemId })
    if (!deletedItem) {
      throw new Error();
    }
    return deletedItem
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ' Items failed');
  }
}
module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  verifyRole,
  verifyClose,
  setPhone_Number,
  createItem,
  fetchItem,
  fetchAllItem,
  updateItem,
  deleteItem,
};
