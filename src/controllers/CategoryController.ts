import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface CategoryInput {
  name: string;
}

export default {
  async cretatingCategory(req: Request<CategoryInput>, res: Response) {
    try {
      const { name } = req.body;

      if (name === undefined || name.trim() === "") {
        return res.status(500).json({
          message: "Unable to enter data in blanks",
        });
      }

      const category = await prisma.category.create({ data: { name } });

      const id = category.id;

      return res.json({ message: "created successfully!", id });
    } catch (error) {
      res.json({ error });
    }
  },
};
