import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateCustomer from "./pages/ManageCustomer.jsx";
import FunctionBar from "./components/FunctionBar.jsx";
import CreateCustomerForm from "./pages/createCustomerForm";
import EditCustomer from "./pages/EditCustomer.jsx";
import CustomerDetails from "./pages/CustomerDetails.jsx";

const App = () => {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <NavBar />
      <FunctionBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manageCustomers" element={<CreateCustomer />} />
        <Route path="/createCustomerForm" element={<CreateCustomerForm />} />
        <Route path="/editCustomer/:id" element={<EditCustomer />} />
        <Route path="/customerDetails/:id" element={<CustomerDetails />} />
      </Routes>
    </div>
  );
};

export default App;
