import { Router } from "express";
import CustomerController from "./controllers/CustomerController";
import BookContoller from "./controllers/BookContoller";
import DeliverySystemController from "./controllers/DeliverySystem";
import CategoryController from "./controllers/CategoryController";
import AuthorContoller from "./controllers/AuthorContoller";
import SearchListCustomer from "./services/SearchListCustomer";
import SearchListBook from "./services/SearchListBook";
import SearchListDelivery from "./services/SearchListDelivery";

const router = Router();

router.post("/customer", CustomerController.creatingCustomers);
router.post("/book", BookContoller.creatingBook);
router.post("/delivery", DeliverySystemController.system);
router.post("/category", CategoryController.cretatingCategory);
router.post("/author", AuthorContoller.creatingAuthor);

router.get("/customerall", SearchListCustomer.customerAll);
router.get("/customer/:id", SearchListCustomer.listCustomer);
router.get("/customer-email/:email", SearchListCustomer.listCustomerEmail);
router.get("/customer-firstname/:first_name", SearchListCustomer.customerName);
router.get("/customer-lastname/:last_name", SearchListCustomer.customerName);

router.get("/bookall", SearchListBook.bookAll)
router.get("/book/:id",SearchListBook.bookId)

router.get("/deliveryall", SearchListDelivery.deliveryAll)

export { router };
