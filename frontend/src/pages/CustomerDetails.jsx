import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerDetails = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/customers/${id}`
        );
        const data = await response.json();
        setCustomer(data.data);
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          Customer Details
        </h1>
        {customer ? (
          <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
            {/* Customer Info Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {customer.name}
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
                <span className="font-medium text-gray-700">Company Name:</span>{" "}
                {customer.name}
              </div>
              <div>
                <span className="font-medium text-gray-700">Department:</span>{" "}
                {customer.department}
              </div>
              <div>
                <span className="font-medium text-gray-700">Company Size:</span>{" "}
                {customer.companySize}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                Contact Information
              </h3>
              <div>
                <span className="font-medium text-gray-700">Main Email:</span>{" "}
                {customer.email?.mainEmail}
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Invoice Email:
                </span>{" "}
                {customer.email?.invoiceEmail}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-700 border-b pb-2">
                Address Information
              </h3>
              <div>
                <span className="font-medium text-gray-700">Main Address:</span>{" "}
                {customer.address?.mainAddress}
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Invoice Address:
                </span>{" "}
                {customer.address?.invoiceAddress}
              </div>
            </div>

            {/* Button to send email */}
            {customer.email?.mainEmail && (
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
