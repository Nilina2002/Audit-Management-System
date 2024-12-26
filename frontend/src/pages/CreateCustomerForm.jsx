import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:5000/api/customers",
        formData
      );
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
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full border max-w-lg bg-white p-8 rounded-lg shadow-md">
        <span className="text-2xl font-bold text-cyan-900 p-4 text-center block">
          Create Customer
        </span>
        <h2 className="text-xl font-semibold  mb-6 pt-6">{titles[step - 1]}</h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
                  className="w-full  border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm hover:shadow-blue-500/50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm hover:shadow-blue-500/50"
                  required
                />
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm hover:shadow-blue-500/50"
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm hover:shadow-blue-500/50"
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm hover:shadow-blue-500/50"
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm hover:shadow-blue-500/50"
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500  hover:shadow-sm hover:shadow-blue-500/50"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 hover:shadow-sm hover:shadow-gray-500/50"
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600  hover:shadow-sm hover:shadow-blue-500/50"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 hover:shadow-sm hover:shadow-green-500/50"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerForm;
