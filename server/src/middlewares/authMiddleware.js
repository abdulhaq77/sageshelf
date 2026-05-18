import jwt from "jsonwebtoken";

// verify the access token
export const verifyToken = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // if NO access token, block access (automatically catches 401 by interceptor in apiClient, and it will hit refresh token endpoint in that case)
  if (!accessToken) {
    console.warn("⚠️ No access token found in cookies. Blocking access.");
    return res.status(401).json({}); // no need to pass data, because it only hits refresh endpoint
  }

  // if access token exists, verify it
  try {
    const decoded = await jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET,
    );

    console.log(
      "✅ Access token verified successfully. Decoded payload:",
      decoded,
    );
    req.userId = decoded.id || decoded._id; // attach decoded user info to request object for downstream use
    next(); // proceed to the next middleware or route handler
  } catch (error) {
    console.error("❌ Error occurred while verifying access token:", error);
    return res.status(401).json({
      message: "Unauthorized: Invalid access token",
      user: {
        id: null,
        name: null,
        role: "guest",
      },
    });
  }
};

// role-based access control middleware
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles || [];
    const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
};
