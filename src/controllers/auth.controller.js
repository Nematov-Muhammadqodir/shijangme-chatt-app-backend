import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { signToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, fullName, password: hashed });
    const token = signToken(newUser._id);

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (e) {
    console.log("Error in signup:", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect credentials!" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Incorrect credentials!" });

    const token = signToken(user._id);
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (e) {
    console.log("Error in login:", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (_req, res) => {
  // Stateless JWT: nothing to do server-side. Client just deletes its token.
  res.status(200).json({ message: "Logged out" });
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Profile pic is required!" });

    const profilePicPath = req.file.path.replace(/\\/g, "/");
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: profilePicPath },
      { new: true }
    ).select("-password");

    res.status(200).json({ user: updated });
  } catch (e) {
    console.log("Error in updateProfile:", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// If you want a "who am I?" endpoint
export const checkAuth = (req, res) => {
  res.status(200).json({ user: req.user });
};
