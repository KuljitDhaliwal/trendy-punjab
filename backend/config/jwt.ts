import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT secret is missing!")
}

export const generateToken = (adminId: string, tokenVersion: number) => {
  return jwt.sign(
    { adminId, tokenVersion },
    JWT_SECRET,
    {
      expiresIn: "15m",
    }
  )
}




export const generateRefreshToken = (adminId: string, tokenVersion: number) => {
  return jwt.sign(
    { adminId, tokenVersion },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )
}


export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, JWT_SECRET) as {
    adminId: string,
    tokenVersion: number
  }
}