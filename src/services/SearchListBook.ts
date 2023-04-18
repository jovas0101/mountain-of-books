import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Book {
  id: number;
}

export default {
  async bookAll(req: Request, res: Response) {
    try {
      const book = await prisma.book.findMany();

      if (!res.headersSent) {
        console.log("header sent successfully!");
      }

      return res.json({ book });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  async bookId(req: Request<Book>, res: Response) {
    try {
      const { id } = req.params!;

      const bookId = await prisma.book.findUnique({
        where: {
          id: +id,
        },
      });

      if (!res.headersSent) {
        console.log("header sent successfully!");
      }

      return res.json({ bookId });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
