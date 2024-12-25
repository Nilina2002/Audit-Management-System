import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    address: {
      mainAddress: {
        type: String,
        required: true,
      },
      invoiceAddress: {
        type: String,
        required: true,
      },
    },
    email: {
      mainEmail: {
        type: String,
        required: true,
      },
      invoiceEmail: {
        type: String,
        required: true,
      },
    },
    companySize: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
