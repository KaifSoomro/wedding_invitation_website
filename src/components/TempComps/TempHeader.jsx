import React from "react";
import TempPhoto from "../../assets/images/tempHeading.png";
import { FileImage, FileDown, Share2, Sparkles } from "lucide-react";
import "../../index.css"

const TempHeader = () => {
  return (
    <div className="w-full mx-auto h-auto lg:h-[280px] relative mt-21 md:mt-25 lg:mt-30 py-12 rounded-2xl px-10 overflow-hidden bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 shadow-lg">
      <img
        src={TempPhoto}
        className="hidden md:block md:w-[30vw] lg:w-[20vw] h-auto rounded-lg absolute top-5 -right-5 shadow-xl transform hover:scale-105 transition-transform duration-300"
        alt="Wedding invitation template"
      />
      
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-violet-600/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span className="text-violet-700 text-sm font-medium">13+ Premium Templates</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl text_font font-bold text-gray-900 mb-3">
          Elegant Wedding Invitations
        </h1>
        
        <h3 className="text-lg md:text-xl text-gray-700 mb-6">
          Beautiful invitations anyone can create in minutes
        </h3>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <FileImage className="w-5 h-5 text-violet-600" />
            <span>High-Quality Export</span>
          </div>
          <div className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-violet-600" />
            <span>Download Image or PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-violet-600" />
            <span>Share Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempHeader;
