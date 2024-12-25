import express from "express";
import dotnenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import customerRoutes from "./routes/customer.route.js";
import departmentHeadRoutes from "./routes/departmentHead.route.js";

const app = express();
dotnenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/customers", customerRoutes);

app.use("/api/admin", departmentHeadRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running at http://localhost:5000");
});
