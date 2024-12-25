import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateCustomer from "./pages/ManageCustomer.jsx";
import FunctionBar from "./components/FunctionBar.jsx";
import CreateCustomerForm from "./pages/createCustomerForm";
const App = () => {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <NavBar />
      <FunctionBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manageCustomers" element={<CreateCustomer />} />
        <Route path="/createCustomerForm" element={<CreateCustomerForm />} />
      </Routes>
    </div>
  );
};

export default App;
