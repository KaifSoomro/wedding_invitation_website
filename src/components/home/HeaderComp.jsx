import React from "react";
import "../../index.css";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { RouteEditor } from "@/helpers/RouteNames";
import { Sparkles, ArrowRight, Star, Users, Check } from "lucide-react";

const HeaderComp = () => {
  return (
    <div className="w-full relative mt-20 md:mt-24 lg:mt-28 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">13+ Premium Templates • 100% Free</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            Design Your Dream
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Wedding Invitation
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create stunning wedding cards in minutes with our intuitive editor. No design skills needed.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to={RouteEditor}>
              <Button className="w-full sm:w-auto text-lg px-8 py-7 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Creating Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <a href="#how-it-works">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto text-lg px-8 py-7 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                See How It Works
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-violet-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium">10,000+ happy couples</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-sm font-medium">4.9/5 rating</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">No credit card required</span>
            </div>
          </div>
        </div>

        {/* Preview Image/Mockup */}
        <div className="mt-16 relative">
          <div className="relative max-w-5xl mx-auto">
            {/* Gradient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-400 opacity-20 blur-3xl rounded-3xl"></div>
            
            {/* Card preview */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[3/4] rounded-xl bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="text-center p-6">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 text-violet-600" />
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Premium Template</h3>
                      <p className="text-sm text-gray-600">Ready to customize</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComp;
