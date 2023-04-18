import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default {
  async deliveryAll(req: Request, res: Response) {
    try {
      const delivery = await prisma.deliverySystem.findMany();

      if (!res.headersSent) {
        console.log("header sent successfully!");
      }

      return res.json({ delivery });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
