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
        console.log(data); // Check the data in console
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

        {/* CRUD Operation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/createCustomerForm"
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Create Customer
            </h2>
            <p className="text-gray-500 mt-2">Add new customer details</p>
          </Link>

          <Link
            to="/updateCustomer"
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Update Customer
            </h2>
            <p className="text-gray-500 mt-2">Edit customer information</p>
          </Link>

          <Link
            to="/deleteCustomer"
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-100 transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Delete Customer
            </h2>
            <p className="text-gray-500 mt-2">Remove a customer</p>
          </Link>
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            All Customers
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading customers...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : customers.length > 0 ? (
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Main Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      {customer._id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      {customer.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      {customer.email?.mainEmail}{" "}
                      {/* Using optional chaining for safety */}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                      {customer.cnNo}
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
