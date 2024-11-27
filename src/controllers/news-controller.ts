import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "./../services/news-service";

import { CreateNewsData } from "../repositories/news-repository";

export async function getNews(req: Request, res: Response) {
  const { page = 1, order = "desc", title = "" } = req.query;

  const pageNumber = Number(page);
  const orderDirection = order === "asc" ? "asc" : "desc";
  
  try {
    const news = await service.getNews(pageNumber, orderDirection, title as string);
    return res.send(news);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function getNewsById(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  const isInvalidId = checkValidId(req, res, id);
  if (isInvalidId) return;

  const news = await service.getNewsById(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function editNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  
  const isInvalidId = checkValidId(req, res, id);
  if (isInvalidId) return;

  const newsData = req.body as CreateNewsData;
  const alteredNews = await service.editNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  
  const isInvalidId = checkValidId(req, res, id);
  if (isInvalidId) return;

  await service.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}

function checkValidId(req: Request, res: Response, id: number) {
  const isInvalidId = isNaN(id) || id <= 0;
  if (isInvalidId) {
    res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
    return true;
  }
  return false;
} 