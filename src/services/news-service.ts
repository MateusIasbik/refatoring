import { badRequestDate, badRequestText, conflictError, notFoundError } from "../errors/errors";
import prisma from "../database";
import * as newsRepository from "../repositories/news-repository";
import { CreateNewsData } from "../repositories/news-repository";

export async function getNews(page: number, order: "asc" | "desc", title: string) {
  const pageSize = 10;

  const skip = (page - 1) * pageSize;

  return newsRepository.getNews(skip, pageSize, order, title);
}

export async function getNewsById(id: number) {
  const news = await newsRepository.getNewsById(id);
  if (!news) throw notFoundError(id);

  return news;
}

export async function createNews(newsData: CreateNewsData) {
  await validateTitle(newsData);
  validateTextLength(newsData);
  validatePublicationDate(newsData);
  return newsRepository.createNews(newsData);
}

export async function editNews(id: number, newsData: CreateNewsData) {
  const news = await getNewsById(id);
  const titleChanged = news.title !== newsData.title;

  if (titleChanged) {
    await validateTitle(newsData)
  };

  validateTextLength(newsData);
  validatePublicationDate(newsData);

  return newsRepository.editNews(id, newsData);
}

export async function deleteNews(id: number) {
  await getNewsById(id);
  return newsRepository.deleteNews(id);
}

async function validateTitle(newsData: CreateNewsData) {

  const existingNewsWithTitle = await prisma.news.findFirst({
    where: { title: newsData.title }
  });

  if (existingNewsWithTitle) throw conflictError(newsData.title);

}

function validateTextLength(newsData: CreateNewsData) {
  if (newsData.text.length < 500) throw badRequestText();
}

function validatePublicationDate(newsData: CreateNewsData) {
  const now = new Date().getTime();
  const publicationDate = new Date(newsData.publicationDate).getTime();
  if (publicationDate < now) throw badRequestDate();
}