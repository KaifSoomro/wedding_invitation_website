import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./components/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import TempSidebar from "./components/TempSidebar";
import Footer from "./components/Footer";
import {
  RouteContact,
  RouteEditor,
  RouteHome,
  RoutePremium,
  RoutePricing,
  RouteTemplate,
} from "./helpers/RouteNames";

const Layout = () => {
  const location = useLocation();

  const getSidebar = () => {
    if (location.pathname === RouteTemplate) {
      return <TempSidebar />;
    }
  };

  return (
    <SidebarProvider>
      {getSidebar()}
      <main id="main-content" className="w-full min-h-screen flex flex-col" role="main">
        <div className="w-full px-8 flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
