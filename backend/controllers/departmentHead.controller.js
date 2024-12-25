import DepartmentHead from "../models/departmentHead.model.js";
import mongoose from "mongoose";

export const getDeptHead = async (req, res) => {
  try {
    const departmentHeads = await DepartmentHead.find({});
    res.status(200).json({ success: true, data: departmentHeads });
  } catch (error) {
    console.error("Error in fetching departmentHeads: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createDeptHead = async (req, res) => {
  const departmentHeads = req.body;
  if (
    !departmentHeads.name ||
    !departmentHeads.department ||
    !departmentHeads.email ||
    !departmentHeads.username ||
    !departmentHeads.password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Department Head data is required" });
  }

  const newDeptHead = new DepartmentHead(departmentHeads);
  try {
    await newDeptHead.save();
    res.status(201).json({ success: true, data: newDeptHead });
  } catch (error) {
    console.error("Error in create head ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDeptHead = async (req, res) => {
  const { id } = req.params;
  const departmentHeads = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid id" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid id" });
  }

  try {
    const updatedDeptHead = await DepartmentHead.findByIdAndUpdate(
      id,
      departmentHeads,
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, data: updatedDeptHead });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Department Head not found" });
  }
};

export const deleteDeptHead = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    await DepartmentHead.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Head deleted successfully" });
  } catch (error) {
    console.error("Error in delete head: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
