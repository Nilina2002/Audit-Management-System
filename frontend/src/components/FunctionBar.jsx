import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFilter,
  FaFileImport,
  FaFileExport,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import * as XLSX from "xlsx"; // Add xlsx package for Excel file processing

const FunctionBar = ({ onSearch, exportData }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  const handleNewClick = () => {
    navigate("/createCustomerForm");
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // Pass the search query to the parent component
    }
  };

  // const handleFileImport = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const data = new Uint8Array(event.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const json = XLSX.utils.sheet_to_json(sheet);
  //       console.log("Imported Data:", json); // Handle imported data here
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  //   setImportModalVisible(false); // Close modal after file upload
  // };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "exported_data.xlsx");
    setExportModalVisible(false); // Close modal after export
  };

  return (
    <div className="bg-gray-700 text-white py-3 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-l-3xl"
          >
            <FaArrowLeft className="inline-block pr-1" />
          </button>

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
          <button
            onClick={handleNewClick}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
          >
            <FaBars className="inline-block pr-1 size-4" />
            New
          </button>
          <button className="hover:bg-white hover:text-black hover:bg-opacity-50 px-4 py-2 rounded">
            <FaFilter className="inline-block pr-1 size-5" />
            Filter
          </button>
          <button
            onClick={() => setImportModalVisible(true)}
            className="hover:bg-white hover:text-black hover:bg-opacity-50 px-4 py-2 rounded"
          >
            <FaFileImport className="inline-block pr-2 size-6" />
            Import
          </button>
          <button
            onClick={() => setExportModalVisible(true)}
            className="hover:bg-white hover:text-black hover:bg-opacity-50 px-4 py-2 rounded"
          >
            <FaFileExport className="inline-block pr-2 size-6" />
            Export
          </button>
        </div>
      </div>

      {/* Import Modal */}
      {importModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg text-black font-semibold mb-4">
              Import Data
            </h3>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileImport}
              className="mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setImportModalVisible(false)}
                className="text-gray-600 border px-4 py-2 rounded-lg mr-2 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {exportModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg text-black font-semibold mb-4">
              Confirm Export
            </h3>
            <p className="text-black mb-4">
              Are you sure you want to export the data?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setExportModalVisible(false)}
                className="text-gray-600 border px-4 py-2 rounded-lg mr-2 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunctionBar;
