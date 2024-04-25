import { Request, Response } from "express";
import { get500Response } from "./server-response";

export const withTryCatch = async (
  req: Request,
  res: Response,
  callback: () => Promise<any> | any
) => {
  const { originalUrl, method } = req;

  const tag = `${method}-${originalUrl}`;

  try {
    await callback();
  } catch (error) {
    console.error("Error:", tag, error);

    get500Response({
      res,
      json: { error: `Error: ${tag}` },
    });
  }
};
