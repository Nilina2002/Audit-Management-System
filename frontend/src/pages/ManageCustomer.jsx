import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CreateCustomerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customer data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customers");
        const data = await response.json();
        setCustomers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete customer
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: "DELETE",
      });

      // Remove the deleted customer with animation
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer._id !== id)
      );
    } catch (err) {
      alert("Failed to delete customer: " + err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Customer Management
        </h1>

        {/* Customer Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            All Customers
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading customers...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : customers.length > 0 ? (
            <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                    Company Name
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                    Department
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                    Main Email
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                    Address
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {customers.map((customer, index) => (
                    <motion.tr
                      key={customer._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <Link
                        to={`/CustomerDetails/${customer._id}`}
                        className="contents"
                      >
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                          {customer._id}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                          {customer.name}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                          {customer.department}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                          {customer.email?.mainEmail}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                          {customer.address?.mainAddress}
                        </td>
                      </Link>
                      <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent Link from triggering on delete button click
                            handleDelete(customer._id);
                          }}
                          className="border p-2 border-red-500 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition-colors ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No customers available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCustomerDashboard;
