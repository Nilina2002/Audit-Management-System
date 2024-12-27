import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import _bg from "../assets/bg.png";

const CreateCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    address: {
      mainAddress: "",
      invoiceAddress: "",
    },
    email: {
      mainEmail: "",
      invoiceEmail: "",
    },
    companySize: "",
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.") || name.includes("email.")) {
      const [field, subField] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [subField]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post("http://localhost:5000/api/customers", formData);
      setSuccess("Customer created successfully!");
      setFormData({
        name: "",
        department: "",
        address: { mainAddress: "", invoiceAddress: "" },
        email: { mainEmail: "", invoiceEmail: "" },
        companySize: "",
      });
      setStep(1);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const titles = ["Basic Information", "Address Details", "Contact Details"];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const buttonHover = {
    hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const messageVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-200 bg-stretch"
      style={{ backgroundImage: `url(${_bg})` }}
    >
      <motion.div
        className="w-full max-w-lg border-cyan-900 border-2 bg-white p-8 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
      >
        <span className="text-2xl font-extrabold underline text-cyan-900 p-4 text-center block ">
          Create Customer
        </span>
        <h2 className="text-xl font-semibold mb-6 pt-6">{titles[step - 1]}</h2>
        <AnimatePresence>
          {error && (
            <motion.div
              className="mb-4 text-red-600 bg-red-100 p-3 rounded"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {success && (
            <motion.div
              className="mb-4 text-green-600 bg-green-100 p-3 rounded"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {step === 1 && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      <option value="Food">Food</option>
                      <option value="Organic">Organic</option>
                      <option value="Textile">Textile</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Address
                    </label>
                    <input
                      type="text"
                      name="address.mainAddress"
                      value={formData.address.mainAddress}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Address
                    </label>
                    <input
                      type="text"
                      name="address.invoiceAddress"
                      value={formData.address.invoiceAddress}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Email
                    </label>
                    <input
                      type="email"
                      name="email.mainEmail"
                      value={formData.email.mainEmail}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Invoice Email
                    </label>
                    <input
                      type="email"
                      name="email.invoiceEmail"
                      value={formData.email.invoiceEmail}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <input
                      type="text"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <motion.button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
              >
                Back
              </motion.button>
            )}
            {step < 3 && (
              <motion.button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg "
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
              >
                Next
              </motion.button>
            )}
            {step === 3 && (
              <motion.button
                type="submit"
                className="px-4 py-2 bg-green-800 text-white rounded-lg"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHover}
              >
                Submit
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCustomerForm;
