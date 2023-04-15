import { Router } from "express";
import CustomerController from "./controllers/CustomerController";
import BookContoller from "./controllers/BookContoller";
const router = Router();

router.post("/customer", CustomerController.creatingCustomers);
router.post("/book", BookContoller.creatingBook);

export { router };
