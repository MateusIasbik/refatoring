import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

// Define o tipo de erro com a propriedade "type"
type AppError = {
  type: string;
  message: string;
};

export default function errorHandlingMiddleware(
  error: Error | AppError, // Aceitar tanto erro padrão quanto o erro personalizado
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error); // Logar para verificar o erro completo

  // Verificar se é um erro do tipo personalizado
  if ("type" in error) {
    const { type, message } = error as AppError; // Agora podemos acessar "type" com segurança

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

  // Se não for um erro do tipo "AppError", então pode ser um erro genérico
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
}
