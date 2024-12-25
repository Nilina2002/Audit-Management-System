import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
                {customers.map((customer, index) => (
                  <tr
                    key={customer._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-all duration-300`}
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
                    <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700">
                      <Link
                        to={`/updateCustomer/${customer._id}`}
                        className="text-blue-500 hover:text-blue-700 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/deleteCustomer/${customer._id}`}
                        className="text-red-500 hover:text-red-700 hover:underline ml-4"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
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
