import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Editor from "./pages/Editor";
import Layout from "./Layout";
import {
  RouteContact,
  RouteEditor,
  RouteHome,
  RoutePremium,
  RoutePricing,
  RouteTemplate,
} from "./helpers/RouteNames";
import Template from "./pages/Template";
import Contact from "./pages/Contact";
import Premium from "./pages/Premium";
import Pricing from "./pages/Pricing";
import NewEditor from "./pages/NewEditor";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={RouteHome} element={<Layout />}>
          <Route path={RouteEditor + "/:id"} element={<Editor />} />
          <Route path={RouteEditor} element={<NewEditor />} />
          <Route path={RouteTemplate} element={<Template />} />
          <Route index element={<Home />} />
          <Route path={RouteContact} element={<Contact />} />
          <Route path={RoutePremium} element={<Premium />} />
          <Route path={RoutePricing} element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
