import { Router } from "express";
import CustomerController from "./controllers/CustomerController";
import BookContoller from "./controllers/BookContoller";
import DeliverySystemController from "./controllers/DeliverySystem";


const router = Router();

router.post("/customer", CustomerController.creatingCustomers);
router.post("/book", BookContoller.creatingBook);
router.post("/delivery", DeliverySystemController.system);


export { router };
