import jwt from 'jsonwebtoken';
import { secretAccessToken, secretRefreshToken } from '../config';

export const generateAccessJWT = ({ id }: { id: string }): string => {
  return jwt.sign(
    {
      id,
    },
    secretAccessToken,
    {
      expiresIn: '30m',
    }
  );
};

export const generateRefreshJWT = ({ id }: { id: string }): string => {
  return jwt.sign(
    {
      id,
    },
    secretRefreshToken,
    {
      expiresIn: '30d',
    }
  );
};
