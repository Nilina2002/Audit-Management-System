import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCustomer = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    department: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/customers/${id}`
        );
        const data = await response.json();
        setCustomer({
          name: data.name,
          department: data.department,
          email: data.email.mainEmail,
          address: data.address.mainAddress,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/customers/${id}`,
        {
          method: "PUT", // Use PUT or PATCH
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        }
      );

      if (!response.ok) throw new Error("Failed to update customer.");

      alert("Customer updated successfully.");
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {loading ? (
          <p className="text-gray-500">Loading customer data...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <h1 className="text-xl font-bold text-gray-800 mb-6">
              Edit Customer
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={customer.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditCustomer;
