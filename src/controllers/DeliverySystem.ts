import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

interface DeliverySystemInput {
  cod_book?: string;
  stock: number;
  available: number;
  days_rent_permitted: Role;
  bookId: number;
}

export default {
  async system(
    req: Request<unknown, unknown, DeliverySystemInput>,
    res: Response
  ) {
    try {
      const { cod_book, stock, available, days_rent_permitted, bookId } = req.body;

      if (isNaN(stock)) {
        return res
          .status(400)
          .json({ message: "please provider a number Stock" });
      }

      if (isNaN(available)) {
        return res
          .status(400)
          .json({ message: "please provider a number Available" });
      }

      if (days_rent_permitted != "THIRTY" && days_rent_permitted != "FOURTEEN") {
        return res
          .status(400)
          .json({ message: "please provide a Role THIRTY or FOURTEEN" });
      }

      if (!bookId || isNaN(bookId)) {
        return res
          .status(400)
          .json({ message: "please provide a valid Book ID" });
      }

      const deliverySystem = await prisma.deliverySystem.create({
        data: {
          cod_book: cod_book ?? nanoid(5),
          stock,
          available,
          days_rent_permitted,
          bookId,
        },
      });
      return res.json({ message: "created successfully!" });
    } catch (error) {
      res.json({ error });
    }
  },
};
