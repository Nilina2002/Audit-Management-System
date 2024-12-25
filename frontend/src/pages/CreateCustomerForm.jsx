import React, { useState } from "react";
import img from "../assets/logo.png";

const CreateCustomerForm = () => {
  // State to hold form data
  const [customerData, setCustomerData] = useState({
    name: "",
    department: "",
    mainEmail: "",
    invoiceEmail: "",
    mainAddress: "",
    invoiceAddress: "",
    companySize: "",
  });

  // State for form submission status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const totalSteps = 3; // Total number of steps in the form

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form data
    const formData = new FormData();
    for (const key in customerData) {
      if (customerData[key]) {
        formData.append(key, customerData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Redirect to the dashboard or display a success message
        // history.push("/createCustomerDashboard");
      } else {
        setError("Error creating customer");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Move to the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Move to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Left Section - Form */}
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md transition-all duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Customer
        </h2>

        {/* Step Titles */}
        {currentStep === 1 && (
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Step 1: Customer Information
          </h3>
        )}
        {currentStep === 2 && (
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Step 2: Contact & Address Details
          </h3>
        )}
        {currentStep === 3 && (
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Step 3: Company Size
          </h3>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Step 1: Name, Department */}
              <div className="transition-opacity duration-300 ease-in">
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md focus:shadow-blue-400"
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="transition-opacity duration-300 ease-in">
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor="department"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={customerData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md focus:shadow-blue-400"
                  placeholder="Enter department"
                  required
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Step 2: Emails, Addresses */}
              <div className="transition-opacity duration-300 ease-in">
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor="mainEmail"
                >
                  Main Email
                </label>
                <input
                  type="email"
                  id="mainEmail"
                  name="mainEmail"
                  value={customerData.mainEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md focus:shadow-blue-400"
                  placeholder="Enter main email"
                  required
                />
              </div>

              <div className="transition-opacity duration-300 ease-in">
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor="invoiceEmail"
                >
                  Invoice Email
                </label>
                <input
                  type="email"
                  id="invoiceEmail"
                  name="invoiceEmail"
                  value={customerData.invoiceEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md focus:shadow-blue-400"
                  placeholder="Enter invoice email"
                  required
                />
              </div>

              <div className="transition-opacity duration-300 ease-in">
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor="mainAddress"
                >
                  Main Address
                </label>
                <textarea
                  id="mainAddress"
                  name="mainAddress"
                  value={customerData.mainAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md focus:shadow-blue-400"
                  placeholder="Enter main address"
                  required
                />
              </div>

              <div className="transition-opacity duration-300 ease-in">
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor="invoiceAddress"
                >
                  Invoice Address
                </label>
                <textarea
                  id="invoiceAddress"
                  name="invoiceAddress"
                  value={customerData.invoiceAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md focus:shadow-blue-400"
                  placeholder="Enter invoice address"
                  required
                />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              {/* Step 3: Company Size */}
              <div className="transition-opacity duration-300 ease-in">
                <label
                  className="block text-sm font-semibold text-gray-700"
                  htmlFor="companySize"
                >
                  Company Size (Number of Employees)
                </label>
                <input
                  type="number"
                  id="companySize"
                  name="companySize"
                  value={customerData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md focus:shadow-blue-400"
                  placeholder="Enter company size"
                  required
                />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border animate-spin mr-2">🔄</span>
                ) : (
                  "Create Customer"
                )}
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>

      {/* Right Section - Image */}
      {/* <div className="hidden md:flex justify-center items-center bg-blue-100 w-full max-w-md">
        <img
          src={img}
          alt="Customer"
          className="w-3/4 h-auto object-cover rounded-lg"
        />
      </div> */}
    </div>
  );
};

export default CreateCustomerForm;
