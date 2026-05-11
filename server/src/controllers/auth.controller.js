import User from "../models/User.model.js";
import Store from "../models/Store.model.js";
import Token from "../models/Token.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //   basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    //   check if user exists in DB, verify password, generate JWT token, etc.
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "Does not have account with this email! Sign Up instead.",
        user: { name: null, role: "guest" },
      });
    }

    //   verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //   generate JWT tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save Refresh Token to MongoDB (Using your Token model)
    await Token.create({
      userId: user._id,
      token: refreshToken,
    });

    // Set the Refresh Token in an HttpOnly, Secure Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents JS from reading the cookie (No XSS)
      secure: process.env.NODE_ENV === "production" ? true : false, // Only sent over HTTP (use false for localhost testing)
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Required for cross-site requests (Frontend on 5173, Backend on 5000)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/", // Explicitly set the path so it's available everywhere
    });

    // Send the Access Token in the response body
    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// register a new user
export const registerUser = async (req, res) => {
  try {
    const { firstName, surname, email, password, role, shopName } = req.body;

    //   basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    //   check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "Already have an account with this email! Login instead.",
        user: true,
      });

    // Create User, hashpassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name: `${firstName} ${surname}`,
      email,
      password: hashedPassword,
      role, // This will be 'customer' or 'seller' from your frontend
    });
    await newUser.save();

    // create store if user is a seller
    if (role === "seller") {
      const newStore = await new Store({
        storeName: shopName,
        owner: newUser._id,
      });
      await newStore.save();
    }
    // send response
    res
      .status(201)
      .json({ message: "Registration successful. Login to continue" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// refreshing the "access token"
export const refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    // if no refresh token exists
    if (!cookies?.refreshToken) {
      return res.status(401).json({
        message: "No refresh token",
        refreshToken: null,
        user: {
          name: null,
          role: "guest", // role is null for guest users
        },
      });
    }

    // if refresh token found, then varify
    const refreshToken = cookies.refreshToken;

    const decoded = await jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );

    const userId = decoded.id || decoded._id;

    const foundUser = await User.findById(userId);

    // no user found
    if (!foundUser)
      return res.status(401).json({
        message: "Unauthorized",
        user: {
          name: null,
          role: "buyer",
        },
      });

    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    res.status(200).json({
      message: "token refreshed successfully",
      accessToken,
      user: {
        name: foundUser.name,
        role: foundUser.role,
      },
    });
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(403).json({ message: "Invalid or Expired Refresh Token" });
  }
};

// logout the user - clear the refresh token cookie and remove it from MongoDB
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      // Physically remove the token from MongoDB
      await Token.findOneAndDelete({ token: refreshToken });
    }

    // Instruct browser to clear the secure cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out",
      user: { name: null, role: "guest" },
    });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  }
};
