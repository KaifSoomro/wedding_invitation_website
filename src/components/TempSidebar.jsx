import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LiaWineGlassAltSolid } from "react-icons/lia";
import { GiWineGlass } from "react-icons/gi";
import { LuHeart } from "react-icons/lu";
import { MdOutlineLunchDining } from "react-icons/md";
import { HiOutlineGiftTop } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "@/features/tempSlice";

const TempSidebar = () => {
  const selectedCategorie = useSelector((state) => state.temp.category);
  const selectedOrientations = useSelector((state) => state.temp.orientation)
  const selectedThemes = useSelector((state) => state.temp.theme);
  const selectedSort = useSelector((state) => state.temp.sortBy);
  const dispatch = useDispatch();
  const categories = [
    {
      name: "Bachlor Party",
      icon: <LiaWineGlassAltSolid />,
    },
    {
      name: "Bachelorette Party",
      icon: <GiWineGlass />,
    },
    {
      name: "Engagement party",
      icon: <LuHeart />,
    },
    {
      name: "Rehearsal dinner",
      icon: <MdOutlineLunchDining />,
    },
    {
      name: "Bridal shower",
      icon: <HiOutlineGiftTop />,
    },
  ];

  const themes = [
    "ai",
    "beach",
    "destination",
    "elegant",
    "floral",
    "pakistani",
    "modern",
    "photo",
    "premium",
    "rustic",
    "simple",
    "vintage",
    "spring",
    "winter",
  ];

  const orientationOptions = ["portrait", "landscape", "square"];
  const sortOptions = ["popular", "trending", "newest"];

  return (
    <Sidebar>
      <SidebarHeader className={"mb-23"} />
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className={"text-md"}>Wedding</SidebarGroupLabel>
          <SidebarMenu>
            {categories.map((item) => {
              const isActive = selectedCategorie.includes(item.name);
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() =>
                      dispatch(
                        toggleFilter({
                          filterType: "category",
                          value: item.name,
                        })
                      )
                    }
                    className={`flex gap-2 text-md ${
                      isActive
                        ? "text-violet-600 font-semibold"
                        : "hover:text-violet-700"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-md mb-1"}>
            Theme
          </SidebarGroupLabel>
          <SidebarMenu className={"flex flex-wrap flex-row"}>
            {themes.map((t) => {
              const isActive = selectedThemes.includes(t);
              return (
                <SidebarMenuItem key={t}>
                  <SidebarMenuButton
                    onClick={() =>
                      dispatch(toggleFilter({ filterType: "theme", value: t }))
                    }
                    className={`border px-4 py-2 rounded-full w-fit capitalize ${
                      isActive
                        ? "bg-violet-500 text-white"
                        : "border-violet-300 hover:bg-violet-200"
                    }`}
                  >
                    {t}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-md mb-1"}>
            Orientation
          </SidebarGroupLabel>
          <SidebarMenu className={"flex flex-wrap flex-row"}>
            {orientationOptions.map((orient) => {
              const isActive = selectedOrientations.includes(orient);
              return (
                <SidebarMenuItem key={orient}>
                  <SidebarMenuButton
                    onClick={() =>
                      dispatch(
                        toggleFilter({
                          filterType: "orientation",
                          value: orient,
                        })
                      )
                    }
                    className={`border px-4 py-2 rounded-full w-fit capitalize ${
                      isActive
                        ? "bg-violet-500 text-white"
                        : "border-violet-300 hover:bg-violet-200"
                    }`}
                  >
                    {orient}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-md mb-1"}>
            Sort by
          </SidebarGroupLabel>
          <SidebarMenu className={"flex flex-wrap flex-row"}>
            {sortOptions.map((sort) => {
              const isActive = selectedSort === sort;
              return (
                <SidebarMenuItem key={sort}>
                  <SidebarMenuButton
                    onClick={() =>
                      dispatch(
                        toggleFilter({ filterType: "sortBy", value: sort })
                      )
                    }
                    className={`border px-4 py-2 rounded-full w-fit capitalize ${
                      isActive
                        ? "bg-violet-500 text-white"
                        : "border-violet-300 hover:bg-violet-200"
                    }`}
                  >
                    {sort}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default TempSidebar;
