import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

type AppError = {
  type: string;
  message: string;
};

export default function errorHandlingMiddleware(
  error: Error | AppError, 
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error); 

  if ("type" in error) {
    const { type, message } = error as AppError; 

    if (type === "notFound") {
      return res.status(httpStatus.NOT_FOUND).send(message);
    } else if (type === "conflict") {
      return res.status(httpStatus.CONFLICT).send(message);
    } else if (type === "badRequestText") {
      return res.status(httpStatus.BAD_REQUEST).send(message);
    } else if (type === "badRequestDate") {
      return res.status(httpStatus.BAD_REQUEST).send(message);
    }
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
}
