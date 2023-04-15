import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface BookInput {
  title: string;
  price: number;
  company: string;
  pages: number;
  description: string;
  userId: number;
  minValue: number;
}

export default {
  async creatingBook(req: Request<unknown, unknown, BookInput>, res: Response) {
    try {
      const {
        title,
        price,
        company,
        pages,
        description,
        userId,
        minValue = 20,
      } = req.body;

      if (price === undefined || price < minValue) {
        return res.status(400).json({
          message: `Please provide a valid price (minimum value: ${minValue}).`,
        });
      }

      if (title.trim() === "") {
        return res.status(400).json({ message: "please provide a Title" });
      }

      if (isNaN(price)) {
        return res.status(400).json({ message: "please provide a Price" });
      }

      if (company.trim() === "") {
        return res.status(400).json({ message: "please provide a Company" });
      }

      if (isNaN(pages)) {
        return res.status(400).json({ message: "please provide a Pages" });
      }

      if (description.trim() === "") {
        return res
          .status(400)
          .json({ message: "please provide a Description" });
      }

      if (!userId || isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "please provide a valid User ID" });
      }

      const book = await prisma.book.create({
        data: {
          title,
          price,
          company,
          pages,
          description,
          userId,
        },
      });

      return res.json({ message: "created successfully!" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
