import bcrypt from "bcryptjs";
import validator from "validator"
import jwt from "jsonwebtoken";
import User from "../models/User.models.js";

//register user controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // password validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain uppercase, lowercase, number and special character",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    //409 response for existing user
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    //success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    //error response
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login user controller
export const loginController = async (req, res) => {
  try {
    // read email and pwd from request body
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    //find user data from model
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    //return invalid error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or username",
      });
    }

    // schema method: to check encrypted password
    const isMatch = await user.comparePassword(password);

    //invalid password error message
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    //token creation using jwt.sign (header+payload+secret) with expiry
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    //send token in response along with user details
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    //send error message
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
