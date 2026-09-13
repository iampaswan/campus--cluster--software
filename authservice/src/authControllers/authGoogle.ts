import { Request, Response } from "express";

import { generateAccessToken, generateRefreshToken } from '../utilities/utils';

const FRONTEND_URL = process.env.FRONTEND_URL;

export const googleCallback = async (req: any, res: Response) => {

  console.log(req.user);

  const payload = {
    userId: req.user.id,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const frontendUrl =
    `${FRONTEND_URL}/oauth-success` +
    `?accessToken=${accessToken}` +
    `&refreshToken=${refreshToken}`;

  return res.redirect(frontendUrl);
};


