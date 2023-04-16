import { Router } from "express";
import CustomerController from "./controllers/CustomerController";
import BookContoller from "./controllers/BookContoller";
import DeliverySystemController from "./controllers/DeliverySystem";
import CategoryController from "./controllers/CategoryController";
import AuthorContoller from "./controllers/AuthorContoller";

const router = Router();

router.post("/customer", CustomerController.creatingCustomers);
router.post("/book", BookContoller.creatingBook);
router.post("/delivery", DeliverySystemController.system);
router.post("/category", CategoryController.cretatingCategory);
router.post("/author", AuthorContoller.creatingAuthor);

export { router };
