import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../utilities/utils';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const publicKey = process.env.JWT_PUBLIC_KEY

import { User } from '../entities/user-entity';
import pool from '../configuration/postgresConfig';
import { AppDataSource } from '../configuration/data-source';
import { AuthenticatedRequest } from '../middleware/auth';


export const refresh = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token missing",
    });
  }

  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    );

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
    });

    return res.json({
      accessToken: newAccessToken,
    });

  } catch (err) {
    return res.status(403).json({
      message: "Invalid refresh token",
    });
  }
};



export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message:
          "User already exists. Please login instead.",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // create user
    const newUser = await pool.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
      `,
      [name, email, hashedPassword]
    );

    const user = newUser.rows[0];

    // jwt payload
    const payload = {
      userId: user.id,
    };

    // generate tokens
    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);


    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message:
        "Server error occurred during registration.",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // find user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const loginUser = result.rows[0];

    // compare password
    const validPassword = await bcrypt.compare(
      password,
      loginUser.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    // jwt payload
    const payload = {
      userId: loginUser.id,
    };

    // generate tokens
    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

  

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: loginUser.id,
        name: loginUser.name,
        email: loginUser.email,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message:
        "Server error occurs during login",
    });
  }
};


export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Access token missing",
      });
    }

    const userRepository =
      AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        googleId: true,
        profileUrl: true,
        authProvider: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};