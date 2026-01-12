import React from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteEditor } from "@/helpers/RouteNames";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50 py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Wedding Cards
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe every love story deserves a beautiful invitation. Our mission is to make
            stunning wedding card design accessible to everyone, completely free.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower couples to create beautiful, personalized wedding invitations without
              expensive designers or complicated software.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A world where every couple can express their unique love story through stunning,
              professionally-designed wedding invitations.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Community</h3>
            <p className="text-gray-600 leading-relaxed">
              Join over 10,000+ happy couples who've created beautiful wedding invitations with
              our platform. Your celebration, your way.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Wedding Cards was born from a simple observation: creating beautiful wedding
                invitations shouldn't require expensive designers or complicated design software.
                Every couple deserves to have stunning invitations that reflect their unique love
                story.
              </p>
              <p>
                We built this platform to be intuitive, powerful, and completely free. With our
                drag-and-drop editor, premium templates, and flexible customization options, you
                can create professional-quality wedding invitations in minutes.
              </p>
              <p>
                Today, we're proud to serve thousands of couples worldwide, helping them celebrate
                their special day with beautiful, personalized invitations. And we're just getting
                started.
              </p>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose Wedding Cards?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎨", title: "13+ Premium Templates", desc: "Professionally designed" },
              { icon: "✨", title: "Easy to Use", desc: "No design skills needed" },
              { icon: "💯", title: "100% Free", desc: "No hidden costs" },
              { icon: "⚡", title: "Instant Export", desc: "Download in seconds" },
              { icon: "📱", title: "Mobile Friendly", desc: "Design anywhere" },
              { icon: "🖼️", title: "Custom Images", desc: "Upload your photos" },
              { icon: "🎭", title: "Shapes & Stickers", desc: "Endless creativity" },
              { icon: "📄", title: "PDF Export", desc: "Print-ready quality" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Create Your Invitation?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of couples who've already created beautiful wedding invitations with our
            free platform. Get started in seconds!
          </p>
          <Link to={RouteEditor}>
            <Button className="px-8 py-6 text-lg bg-white text-violet-600 hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all">
              Start Creating Free →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
