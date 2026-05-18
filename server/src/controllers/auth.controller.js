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
    console.log("Login attempt with email:", req.body.email);
    const { email, password } = req.body;

    // (Your existing validation and user check logic) ...
    const foundUser = await User.findOne({ email }).select("+password");

    if (!foundUser) {
      return res.status(404).json({
        message:
          "You don't have an account with this email! Please register first.",
      });
    }
    // if user found and password doesn't match
    if (foundUser && !(await bcrypt.compare(password, foundUser.password))) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // if user found and password matches, generate tokens

    // Generate JWT tokens
    const accessToken = await generateAccessToken({
      id: foundUser._id,
    });
    const refreshToken = await generateRefreshToken(foundUser._id);

    console.log("Generated Access Token:", accessToken);
    console.log("Generated Refresh Token:", refreshToken);
    console.log("found user : ", foundUser);

    // create and Save Refresh Token to MongoDB
    const newRefreshToken = new Token({
      userId: foundUser._id,
      token: refreshToken,
    });
    await newRefreshToken.save();

    // COOKIE 1: Access Token (Short-lived)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000, // 15 Minutes
      path: "/",
    });

    // SET COOKIE 2: Refresh Token (Long-lived)
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
      path: "/", // Note: You can set path to "/api/auth/refresh" for extra security
    });

    console.log("sending resp: ", foundUser);
    // Send User Data ONLY (No tokens in the body!)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: foundUser._id,
        name: foundUser.name,
        role: foundUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
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
  const _refreshToken = req.cookies.refreshToken;

  // if no refresh token, block access and ask to login again (treat as expired)
  if (!_refreshToken) {
    return res.status(400).json({
      message: "Session expired",
      user: {
        id: null,
        name: null,
        role: "guest",
      },
    });
  }

  try {
    console.log("Received refresh token:", _refreshToken);
    const decoded = await jwt.verify(
      _refreshToken.token,
      process.env.JWT_REFRESH_SECRET,
    );

    console.log("Decoded refresh token payload:", decoded);
    console.log("Decoded refresh token user ID:", decoded.id);

    // Check if the token exists in MongoDB
    const refreshTokenInfo = await Token.findOne({
      userId: decoded.id,
    });

    console.log("Refresh token info from DB:", refreshTokenInfo);

    // if token not found in DB, it means the user logged out or token was removed. Treat as expired.
    if (!refreshTokenInfo.token) {
      return res.status(403).json({
        message: "Session expired",
        user: {
          id: null,
          name: null,
          role: "guest",
        },
      });
    }

    // if token is valid and exists in DB, generate new access token, and fetch user data to send back

    // genearte new access token
    const newAccessToken = generateAccessToken({
      id: decoded.id || decoded._id,
    });

    // Fetch user data to send back
    const foundUser = await User.findById(decoded.id || decoded._id);

    // Send new Access Token as cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000, // 15 Minutes
    });

    // send user data back to frontend
    res.status(200).json({
      message: "Access token refreshed",
      user: {
        id: foundUser._id,
        name: foundUser.name,
        role: foundUser.role,
      },
    });
  } catch (err) {
    // Again, 403 or 401 ONLY if you want to retry. Since we don't, use 403.
    return res.status(403).json({
      message: "Invalid refresh token",
      user: {
        id: null,
        name: null,
        role: "guest",
      },
    });
  }
};

// logout the user - clear the refresh token cookie and remove it from MongoDB
export const logout = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    console.log("cookies in logout : ", req.cookies);

    if (refreshToken) {
      // Physically remove the token from MongoDB
      await Token.findOneAndDelete({ token: refreshToken });
    }

    // Instruct browser to clear the accessToken cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    // Instruct browser to clear the refreshToken cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out",
      user: { id: null, name: null, role: "guest" },
    });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

// get user profile
export const getProfile = async (req, res) => {
  console.log("Fetching profile for user ID:", req.userId);
  try {
    const { id } = req.userId;
    const foundUser = await User.findById(id);

    console.log("Found user for profile:", foundUser);

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
        user: {
          id: null,
          name: null,
          role: "guest",
        },
      });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        id: foundUser._id,
        name: foundUser.name,
        role: foundUser.role,
      },
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    throw error;
  }
};
