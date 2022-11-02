const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const { resolveConfig } = require('prettier');


const register = catchAsync(async (req, res) => {
  userService.getUserByEmail(req.body.email).then((res) => {
    console.log(res)
    if (res) return res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      message: 'Email already taken'
    });
  });

  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.body);
  await emailService.sendVerificationEmail(req.body.email, verifyEmailToken);
  return res.status(httpStatus.OK).send({
    success: true,
    message: "Please check your mail and verify to register!"
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  console.log(req.query.token)
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});


module.exports = {
  register,
  login,
  verifyEmail,
};
