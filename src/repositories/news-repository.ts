import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;
 
export async function getNews(skip: number, take: number, order: "asc" | "desc", title: string) {
  return prisma.news.findMany({
    skip: skip,
    take: take,
    orderBy: {
      publicationDate: order,
    },
    where: {
      title: {
        contains: title,
        mode: 'insensitive'
      },
    },
  });
}
 
export function getNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id }
  })
}

export async function createNews(newsData: CreateNewsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) }
  });
}

export async function editNews(id: number, news: CreateNewsData) {
  return prisma.news.update({
    where: { id },
    data: { ...news, publicationDate: new Date(news.publicationDate) }
  })
}

export async function deleteNews(id: number) {
  return prisma.news.delete({
    where: { id }
  })
}