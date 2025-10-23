import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./components/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import TempSidebar from "./components/TempSidebar";
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
      <main className="w-full">
        <div className="w-full px-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
