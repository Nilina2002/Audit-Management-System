import React, { useState } from "react";
import img from "../assets/logo.png";

const CreateCustomerForm = () => {
  // State to hold form data
  const [customerData, setCustomerData] = useState({
    name: "",
    cccNo: "",
    mainEmail: "",
    invoiceEmail: "",
    mainAddress: "",
    invoiceAddress: "",
    image: null, // For image upload
  });

  // State for form submission status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomerData({
        ...customerData,
        image: file,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form data with image handling
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section - Form */}
      <div className="flex-1 bg-white p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Customer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Customer Code (CCC No) Field */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="cccNo"
            >
              Customer Code (CCC No)
            </label>
            <input
              type="text"
              id="cccNo"
              name="cccNo"
              value={customerData.cccNo}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter customer code (CCC No)"
              required
            />
          </div>

          {/* Main Email Field */}
          <div>
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter main email"
              required
            />
          </div>

          {/* Invoice Email Field */}
          <div>
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter invoice email"
              required
            />
          </div>

          {/* Main Address Field */}
          <div>
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter main address"
              required
            />
          </div>

          {/* Invoice Address Field */}
          <div>
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter invoice address"
              required
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="image"
            >
              Upload Customer Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Customer"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1 hidden md:flex justify-center items-center bg-blue-100">
        <img
          src={img}
          alt="Customer"
          className="w-3/4 h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default CreateCustomerForm;
