import express from "express";
import { getDeptHead } from "../controllers/departmentHead.controller.js";
import { createDeptHead } from "../controllers/departmentHead.controller.js";
import { updateDeptHead } from "../controllers/departmentHead.controller.js";
import { deleteDeptHead } from "../controllers/departmentHead.controller.js";

const router = express.Router();

router.get("/", getDeptHead);

router.post("/", createDeptHead);

router.put("/:id", updateDeptHead);

router.delete("/:id", deleteDeptHead);

export default router;
