import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: false,
    domain: ".kadai.uz",
  });
  return token;
};

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
