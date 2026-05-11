import User from "../models/User.model.js";
import bcrypt from "bcrypt";

// Seed Admin User
export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!existingAdmin) {
      console.log("No existing admin found. Seeding new admin user...");
      const admin = await new User({
        name: "System Admin",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD, // Plain text here...
        role: "admin",
        agree: true,
      });

      console.log("Admin user created with plain password. Now hashing...");
      // Hash the password before saving
      admin.password = await bcrypt.hash(admin.password, 10);
      await admin.save();

      console.log("✅ Admin seeded and password HASHED.");
    } else {
      console.log("Admin already found !");
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};
