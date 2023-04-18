import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export default {
  async customerAll(req: Request, res: Response) {
    try {
      const customerAll = await prisma.customer.findMany();

      if (!res.headersSent) {
        console.log("header sent successfully!");
      }

      return res.json({ customerAll });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  async customerName(req: Request<Customer>, res: Response) {
    try {
      const { first_name, last_name } = req.params;

      const customerAll = await prisma.customer.findMany({
        where: {
          first_name: {
            contains: first_name,
          },
          last_name: {
            contains: last_name,
          },
        },
      });

      if (customerAll.length === 0) {
        return res.status(404).json({ message: "Not found customer!" });
      }

      if (!res.headersSent) {
        console.log("header sent successfully!");
      }

      return res.json({ customerAll });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  async listCustomer(req: Request<Customer>, res: Response) {
    try {
      const { id } = req.params;

      const customer = await prisma.customer.findUnique({
        where: {
          id: +id,
        },
      });

      if (!customer) {
        return res.status(404).json({ message: "Not Found" });
      }

      if (!res.headersSent) {
        console.log("header sent successfully!");
      }

      return res.json({ customer });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  async listCustomerEmail(req: Request<Customer>, res: Response) {
    try {
      const { email } = req.params;

      const customer = await prisma.customer.findUnique({
        where: {
          email,
        },
      });

      if (!customer) {
        return res.status(404).json({ message: "Not Found" });
      }

      if (!res.headersSent) {
        console.log("header sent successfully!");
      }

      return res.json({ customer });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
