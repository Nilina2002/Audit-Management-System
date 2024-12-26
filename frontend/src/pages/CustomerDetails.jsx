import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/customers/${id}`
        );
        const data = await response.json();
        setCustomer(data.data);
        setEditedCustomer(data.data);
      } catch (err) {
        setError("There was an error fetching the customer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleSendEmail = () => {
    if (customer?.email?.mainEmail) {
      const email = customer.email.mainEmail;
      const subject = "Customer Inquiry";
      const body = "Dear Customer,\n\n";
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    } else {
      alert("No main email address is available for this customer.");
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/customers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedCustomer),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Customer data updated successfully.");
        setCustomer(data.data);
        setIsEditing(false);
      } else {
        setError("There was an error updating the customer data.");
      }
    } catch (err) {
      setError("There was an error updating the customer data.");
    }
  };

  const handleInputChange = (field, value, nestedField = null) => {
    setEditedCustomer((prev) => {
      if (nestedField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [nestedField]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleCancelEdit = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Customer Details
          </h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 rounded-md bg-green-600 text-white font-semibold  hover:bg-blue-700"
            >
              <FaEdit />
            </button>
          ) : (
            <div className="space-x-4">
              <button
                onClick={handleUpdateCustomer}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {customer ? (
          <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
            {/* Customer Info Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedCustomer.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  customer.name
                )}
              </h2>
              <div>
                <span className="font-medium text-gray-700">Customer ID:</span>{" "}
                {customer._id}
              </div>
            </div>

            {/* Company Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                Company Information
              </h3>
              <div>
                <span className="font-medium text-gray-700">Department:</span>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedCustomer.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  customer.department
                )}
              </div>
              <div>
                <span className="font-medium text-gray-700">Company Size:</span>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedCustomer.companySize}
                    onChange={(e) =>
                      handleInputChange("companySize", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  customer.companySize
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                Contact Information
              </h3>
              <div>
                <span className="font-medium text-gray-700">Main Email:</span>{" "}
                {isEditing ? (
                  <input
                    type="email"
                    value={editedCustomer.email?.mainEmail}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value, "mainEmail")
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  customer.email?.mainEmail
                )}
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Invoice Email:
                </span>{" "}
                {isEditing ? (
                  <input
                    type="email"
                    value={editedCustomer.email?.invoiceEmail}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value, "invoiceEmail")
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  customer.email?.invoiceEmail
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                Address Information
              </h3>
              <div>
                <span className="font-medium text-gray-700">Main Address:</span>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedCustomer.address?.mainAddress}
                    onChange={(e) =>
                      handleInputChange(
                        "address",
                        e.target.value,
                        "mainAddress"
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  customer.address?.mainAddress
                )}
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Invoice Address:
                </span>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedCustomer.address?.invoiceAddress}
                    onChange={(e) =>
                      handleInputChange(
                        "address",
                        e.target.value,
                        "invoiceAddress"
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  customer.address?.invoiceAddress
                )}
              </div>
            </div>

            {/* Send Email button */}
            {customer.email?.mainEmail && !isEditing && (
              <div className="text-center">
                <button
                  onClick={handleSendEmail}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Send Email
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-10">
            Customer not found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
