import React from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaFileImport, FaFileExport, FaBars } from "react-icons/fa";

const FunctionBar = () => {
  return (
    <div className="bg-gray-700 text-white py-3 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-600 text-white placeholder-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          {/* Navigation Links */}
          <Link
            to="/"
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
          >
            Dashboard
          </Link>
          <Link
            to="/manageCustomers"
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded inline-block text-center"
          >
            Customers
          </Link>
        </div>

        <div className="flex items-center space-x-1">
          {/* Action Buttons */}
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
            <FaBars className="inline-block pr-1 size-4" />
            New
          </button>
          <button className=" hover:bg-white hover:text-black hover:bg-opacity-50   px-4 py-2 rounded">
            <FaFilter className="inline-block pr-1 size-5" />
            Filter
          </button>
          <button className=" hover:bg-white hover:text-black hover:bg-opacity-50 px-4 py-2 rounded">
            <FaFileImport className="inline-block pr-2 size-6" />
            Import
          </button>
          <button className=" hover:bg-white hover:text-black hover:bg-opacity-50 px-4 py-2 rounded">
            <FaFileExport className="inline-block pr-2 size-6" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunctionBar;
