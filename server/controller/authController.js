"use strict";

// controllers/AuthController.js
const { User, Admin } = require('../models');
const { generate_token } = require('../helper/token'); // Import your token generation module
const { check_password } = require('../helper/bcrypt'); // Import your password check module

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user && (await check_password(password, user.password))) {
        const user_token = generate_token(user);
        return res.status(201).json({
          message: 'Success Login',
          access_token: user_token,
          user,
          userType: 'user',
        });
      } else if (!user) {
        const admin = await Admin.findOne({ where: { email } });
        if (admin && (await check_password(password, admin.password))) {
          const admin_token = generate_token(admin);
          return res.status(201).json({
            message: 'Success Login',
            access_token: admin_token,
            user: admin,
            userType: 'admin',
          });
        } else {
          return next({ message: 'Invalid email/password' });
        }
      } else {
        return next({ message: 'Invalid email/password' }); // Handle invalid password for user
      }
    } catch (error) {
      next(error);
    }
  }
}

  // Other authentication-related actions...

module.exports = AuthController;
