import Customer from "../models/customer.model.js";
import mongoose from "mongoose";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    console.error("Error in fetching customers: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createCustomer = async (req, res) => {
  const customer = req.body;
  if (
    !customer.name ||
    !customer.department ||
    !customer.address ||
    !customer.email ||
    !customer.companySize
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Customer data is required" });
  }

  const newCustomer = new Customer(customer);
  try {
    await newCustomer.save();
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    console.error("Error in create product ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const customer = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Customer not found" });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    await Customer.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error in delete product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid customer id" });
  }

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error("Error in fetching customer: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
