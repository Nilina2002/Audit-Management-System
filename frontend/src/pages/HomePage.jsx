import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Customers
            </h2>
            <p className="text-4xl font-bold text-gray-800 mt-2">150</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Active Projects
            </h2>
            <p className="text-4xl font-bold text-gray-800 mt-2">25</p>
          </div>
          {/* <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="text-4xl font-bold text-gray-800 mt-2">$12,340</p>
          </div> */}
        </div>

        {/* Quick Links */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Quick Links
          </h2>
          <div className="flex flex-col space-y-4">
            <Link
              to="/manageCustomers"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Create a New Customer
            </Link>
            <Link
              to="/manageProjects"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Manage Projects
            </Link>
            <Link
              to="/reports"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
