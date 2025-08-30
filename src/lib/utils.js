import jwt from "jsonwebtoken";

export const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

// export const generateToken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: false, // only true in prod with HTTPS
//     sameSite: "none", // allow cross-origin
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });
//   return token;
// };
