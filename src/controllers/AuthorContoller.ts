import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface AuthorInupt {
  first_name: string;
  last_name: string;
  sectionId: number;
}

export default {
  async creatingAuthor(req: Request<AuthorInupt>, res: Response) {
    try {
      const { first_name, last_name, sectionId } = req.body;

      if (first_name === undefined || first_name.trim() === "") {
        return res.status(500).json({
          message: "Unable to enter data in blanks",
        });
      }

      if (last_name === undefined || last_name.trim() === "") {
        return res.status(500).json({
          message: "Unable to enter data in blanks",
        });
      }

      if (!sectionId || isNaN(sectionId)) {
        return res
          .status(400)
          .json({ message: "please provide a valid User ID" });
      }

      const author = await prisma.author.create({
        data: {
          first_name,
          last_name,
          sectionId,
        },
      });

      const id = author.id;

      return res.json({ message: "created successfully!", id });
    } catch (error) {
      return res.json({ error });
    }
  },
};
