import HeaderComp from "@/components/home/HeaderComp";
import TrendingCardComp from "@/components/home/TrendingCardComp";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteEditor, RouteTemplate } from "@/helpers/RouteNames";
import { 
  Sparkles, 
  Zap, 
  Heart, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  Download,
  Star,
  Users,
  Clock
} from "lucide-react";

const Home = () => {
  return (
    <>
      <div className="px-4 lg:px-20">
        {/* Hero Section */}
        <HeaderComp />
        
        {/* Features Section */}
        <section className="py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Designer?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional tools, stunning templates, and unlimited creativity at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                13+ professionally designed templates with stunning backgrounds and elegant typography
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Editing</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time canvas editor with drag-and-drop, resize, rotate, and style any element instantly
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Type className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Text</h3>
              <p className="text-gray-600 leading-relaxed">
                Multiple fonts, sizes, colors, bold, italic, alignment - complete typography control
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Image Upload</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your photos, drag-and-drop images, or paste URLs to personalize your design
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Shapes & Stickers</h3>
              <p className="text-gray-600 leading-relaxed">
                Add circles, rectangles, stars, lines, arrows, and wedding-themed emoji stickers
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Export Anywhere</h3>
              <p className="text-gray-600 leading-relaxed">
                Download as PNG, JPEG, or PDF in high resolution - perfect for printing or sharing
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white px-8">
            <div className="group cursor-pointer">
              <div className="flex justify-center mb-3">
                <Star className="w-12 h-12 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-5xl font-bold mb-2">13+</div>
              <div className="text-xl opacity-90">Premium Templates</div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-center mb-3">
                <Users className="w-12 h-12 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-xl opacity-90">Happy Couples</div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-center mb-3">
                <Clock className="w-12 h-12 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-5xl font-bold mb-2">&lt; 5min</div>
              <div className="text-xl opacity-90">To Create Design</div>
            </div>
          </div>
        </section>

        {/* Trending Templates */}
        <TrendingCardComp />

        {/* CTA Section */}
        <section className="py-16 lg:py-24 mb-16">
          <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-violet-100 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-violet-300 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <Heart className="w-16 h-16 mx-auto mb-6 text-rose-600" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Create Your Dream Invitation?
              </h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of couples who designed their perfect wedding cards with us. 
                Start creating in minutes - no design skills needed!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={RouteEditor}>
                  <Button size="lg" className="text-xl px-8 py-6 bg-violet-600 hover:bg-violet-700 shadow-xl hover:shadow-2xl transition-all">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Start Designing Now
                  </Button>
                </Link>
                <Link to={RouteTemplate}>
                  <Button size="lg" variant="outline" className="text-xl px-8 py-6 border-2 border-violet-600 text-violet-600 hover:bg-violet-50 shadow-lg">
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 lg:py-20 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Create your perfect wedding card in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Choose Template</h3>
              <p className="text-gray-600 text-lg">
                Pick from 13+ stunning premium templates or start from scratch
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Customize Design</h3>
              <p className="text-gray-600 text-lg">
                Add text, images, shapes, and stickers. Make it uniquely yours!
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Download & Share</h3>
              <p className="text-gray-600 text-lg">
                Export as PNG, JPEG, or PDF in high quality and share with guests
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
