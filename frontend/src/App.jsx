import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateCustomer from "./pages/CreateCustomer";
import FunctionBar from "./components/FunctionBar.jsx";
import CreateCustomerForm from "./pages/createCustomerForm";
const App = () => {
  return (
    <>
      <NavBar />
      <FunctionBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manageCustomers" element={<CreateCustomer />} />
        <Route path="/createCustomerForm" element={<CreateCustomerForm />} />
      </Routes>
    </>
  );
};

export default App;
