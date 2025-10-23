import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { PiCrownSimple } from "react-icons/pi";
import { BiDollar } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { GoDot } from "react-icons/go";
import {
  RouteContact,
  RouteHome,
  RoutePremium,
  RoutePricing,
  RouteTemplate,
} from "@/helpers/RouteNames";


const EditorSidebar = () => {

    const navRoutes = [
    {
      name: "Home",
      icon: <IoHomeOutline />,
      path: RouteHome,
    },
    {
      name: "Templates",
      icon: <LuLayoutTemplate />,
      path: RouteTemplate,
    },
    {
      name: "Premium",
      icon: <PiCrownSimple />,
      path: RoutePremium,
    },
    {
      name: "Pricing",
      icon: <BiDollar />,
      path: RoutePricing,
    },
    {
      name: "Contact",
      icon: <FiUsers />,
      path: RouteContact,
    },
  ];

  return (
    <Sidebar className={"border-none"}>
      <SidebarHeader className={"mb-23"} />
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            {navRoutes.map((nav,index) => (
              <SidebarMenuItem key={nav.name+index}>
                <SidebarMenuButton className={"text-md hover:text-violet-700"}>
                  {nav.icon}
                  <Link to={nav.path}>{nav.name}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoDot />
                <Link to={""}>Category Item</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default EditorSidebar