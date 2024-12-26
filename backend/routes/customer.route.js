import express from "express";
import { getCustomers } from "../controllers/customer.controller.js";
import { createCustomer } from "../controllers/customer.controller.js";
import { updateCustomer } from "../controllers/customer.controller.js";
import { deleteCustomer } from "../controllers/customer.controller.js";
import { getCustomerById } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", getCustomers);

router.get("/:id", getCustomerById);

router.post("/", createCustomer);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

export default router;
