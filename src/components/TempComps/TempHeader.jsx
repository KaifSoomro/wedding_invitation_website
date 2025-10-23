import React from "react";
import TempPhoto from "../../assets/images/tempHeading.png";
import "../../index.css"

const TempHeader = () => {
  return (
    <div className="w-full mx-auto h-[210px] lg:h-[230px] relative mt-21 md:mt-25 lg:mt-30 py-10 rounded-lg px-10 overflow-hidden bg-pink-100">
      <img
        src={TempPhoto}
        className="hidden md:block md:w-[30vw] lg:w-[20vw] h-auto rounded-lg absolute top-5 -right-5"
        alt=""
      />
      <h1 className="text-4xl text_font">Elegant wedding invitations</h1>
      <h3 className="mt-3">Beautiful invitations anyone can create</h3>
      <ul className="w-full flex items-center gap-7 mt-13">
        <li>Download Image or PDF</li>
        <li className="list-disc">Share online</li>
      </ul>
    </div>
  );
};

export default TempHeader;
