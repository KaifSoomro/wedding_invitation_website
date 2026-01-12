import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { CanvasEditor } from "./pages/CanvasEditor";
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
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Help from "./pages/Help";
import About from "./pages/About";
import { SkipToContent } from "./components/Accessibility";

const App = () => {
  return (
    <Router>
      <SkipToContent />
      <Routes>
        {/* Editor routes (no navbar, full-screen) */}
        <Route path={RouteEditor + "/:id"} element={<CanvasEditor />} />
        <Route path={RouteEditor} element={<CanvasEditor />} />

        {/* Regular pages (with navbar and layout) */}
        <Route element={<><Navbar /><Layout /></>}>
          <Route path={RouteHome} index element={<Home />} />
          <Route path={RouteTemplate} element={<Template />} />
          <Route path={RouteContact} element={<Contact />} />
          <Route path={RoutePremium} element={<Premium />} />
          <Route path={RoutePricing} element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


