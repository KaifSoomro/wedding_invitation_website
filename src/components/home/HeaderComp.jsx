import React from "react";
import "../../index.css";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { RouteEditor } from "@/helpers/RouteNames";

const HeaderComp = () => {
  return (
    <div className="w-full mx-auto h-[270px] md:h-[290px] lg:h-[400px] relative mt-21 md:mt-25 lg:mt-30 py-10 rounded-lg flex items-center justify-center">
      <img
        src="https://watermark.lovepik.com/photo/20211123/large/lovepik-wedding-banquet-hall-picture_500865604.jpg"
        className="w-full h-full rounded-lg -z-10 object-cover absolute top-0 left-0"
        alt=""
      />
      <div className="w-full h-full bg-violet-950/60 rounded-lg -z-9 absolute top-0 left-0"></div>
      <div className="w-full lg:w-[50%] text-center">
        <h1 className="text-3xl md:text-5xl md:mb-2 lg:text-7xl text_font font-semibold text-white">
          Ready to <span>celebrate</span>
        </h1>
        <h2 className="text-white text-xl font-semibold my-1 md:my-0 md:hidden">
          Design to impress
        </h2>
        <p className="hidden md:block md:text-md lg:text-lg mb-3 text-white leading-5">
          Every love story is unique—your wedding invitations should be too. We
          craft custom designs that capture your style, your story, and the joy
          of your special day, making every detail beautifully personal.
        </p>
        <Link to={RouteEditor}>
          <Button className="text-lg md:text-xl h-12 rounded-sm bg-violet-600 hover:bg-violet-500">
            Create your own
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderComp;
