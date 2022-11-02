const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const registerData = {
    name: payload.name,
    email: payload.email,
    password: payload.password
  }
  const tokenDoc = await Token.findOne({ token, type, user: payload.email, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return { tokenDoc, registerData };
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (body) => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const payload = {
    name: body.name,
    email: body.email,
    password: body.password,
    iat: moment().unix(),
    exp: expires.unix(),
    type: tokenTypes.VERIFY_EMAIL,
  };
  const verifyEmailToken = jwt.sign(payload, config.jwt.secret);
  await saveToken(verifyEmailToken, body.email, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

//NEW...

const generateVerifyRoleToken = async (user) => {
  const expires = moment().add(config.jwt.verifyRoleExpirationMinutes, 'minutes');
  const verifyRoleToken = generateToken(user.id, expires, tokenTypes.VERIFY_ROLE);
  await saveToken(verifyRoleToken, user.id, expires, tokenTypes.VERIFY_ROLE);
  return verifyRoleToken;
};

const generateVerifyCloseAccountToken = async (user) => {
  const expires = moment().add(config.jwt.verifyCloseAccountExpirationMinutes, 'minutes');
  const verifyCloseAccountToken = generateToken(user.id, expires, tokenTypes.VERIFY_CLOSE_ACC);
  await saveToken(verifyCloseAccountToken, user.id, expires, tokenTypes.VERIFY_CLOSE_ACC);
  return verifyCloseAccountToken;
};


module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  generateVerifyRoleToken,
  generateVerifyCloseAccountToken,
};
