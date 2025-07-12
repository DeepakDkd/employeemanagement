import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
