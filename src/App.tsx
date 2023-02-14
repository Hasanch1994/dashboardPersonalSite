import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/404/NotFoundPage";
import Login from "./components/login/login";
import RequireAuth from "./components/helper/requireAuth";
import Layout from "./components/layout/layout";
import Main from "./components/main/main";
import Inbox from "./components/pages/inbox";
import { ReactQueryDevtools } from "react-query/devtools";
import Skills from "./components/pages/skills";
import Portfolios from "./components/pages/portfolios";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Main />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/portfolios" element={<Portfolios />} />

            {/* <Route path="customers" element={<Customers />} />
          <Route path="deals" element={<Deals />} />
          <Route path="addCustomer/:tabName" element={<AddCustomer />} />
          <Route path="newDeal/:customerId" element={<NewDeal />} />

          <Route path="reports" element={<Reports />}>
            <Route path="customers" element={<CustomersReports />} />
            <Route path="deals" element={<DealsReports />} />
          </Route> */}

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
