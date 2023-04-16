import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface CustomerInput {
  first_name: string;
  last_name: string;
  doc_user: string;
  email: string;
  phone: string;
}

export default {
  async creatingCustomers(
    req: Request<unknown, unknown, CustomerInput>,
    res: Response
  ) {
    try {
      const { first_name, last_name, doc_user, email, phone } = req.body;

      if (first_name === undefined || first_name.trim() === "") {
        return res.status(500).json({
          message:
            "There is already a user registered with this First Name, please try again",
        });
      }

      if (last_name === undefined || last_name.trim() === "") {
        return res.status(500).json({
          message:
            "There is already a user registered with this First Name, please try again",
        });
      }

      const existingDocumentNumber = await prisma.customer.findUnique({
        where: { doc_user },
      });

      if (existingDocumentNumber) {
        return res.status(500).json({
          message:
            "There is already a user registered with this Document Number, please try again",
        });
      }

      const existingEmail = await prisma.customer.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return res.status(500).json({
          message:
            "There is already a user registered with this Email, please try again",
        });
      }

      const existingPhone = await prisma.customer.findUnique({
        where: { phone },
      });

      if (existingPhone) {
        return res.status(500).json({
          message:
            "There is already a user registered with this Phone, please try again",
        });
      }

      const customer = await prisma.customer.create({
        data: {
          first_name,
          last_name,
          doc_user,
          email,
          phone,
        },
      });

      const idCustomer = await prisma.customer.findUnique({
        where: customer,
      });

      return res.json({ message: "created successfully!", idCustomer});
    } catch (error) {
      res.json({ error });
    }
  },
};
