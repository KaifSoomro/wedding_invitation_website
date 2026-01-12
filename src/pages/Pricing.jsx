import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Crown, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RouteEditor, RouteTemplate } from '@/helpers/RouteNames'

const Pricing = () => {
  const features = [
    "13+ Premium Wedding Templates",
    "Unlimited Design Edits",
    "Custom Text & Fonts",
    "Upload Your Own Images",
    "Shapes & Stickers Library",
    "High-Resolution Export",
    "PNG, JPEG & PDF Download",
    "Print-Ready Quality",
    "Mobile & Desktop Editor",
    "No Watermarks",
    "Commercial Use Allowed",
    "Lifetime Access"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium">100% Free Forever</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create stunning wedding invitations. No hidden fees, no subscriptions, no credit card required.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-violet-600 relative">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-bl-2xl font-semibold flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Most Popular
            </div>

            <div className="p-12">
              {/* Price Section */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-12 h-12 text-violet-600" />
                  <h2 className="text-4xl font-bold text-gray-900">Free Plan</h2>
                </div>
                <div className="mb-4">
                  <span className="text-7xl font-bold text-violet-600">$0</span>
                  <span className="text-2xl text-gray-600 ml-2">/ forever</span>
                </div>
                <p className="text-lg text-gray-600">
                  Full access to all features. No trials, no limits, no catches.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to={RouteEditor} className="flex-1">
                  <Button className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                    Start Creating Now →
                  </Button>
                </Link>
                <Link to={RouteTemplate} className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full py-6 text-lg rounded-full border-2 border-violet-600 text-violet-600 hover:bg-violet-50 transition-all"
                  >
                    Browse Templates
                  </Button>
                </Link>
              </div>

              {/* Features List */}
              <div className="border-t-2 border-gray-100 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Everything Included:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Elements */}
              <div className="mt-12 pt-8 border-t-2 border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-violet-600 mb-2">10,000+</div>
                    <div className="text-gray-600">Happy Couples</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-violet-600 mb-2">13+</div>
                    <div className="text-gray-600">Premium Templates</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-violet-600 mb-2">4.9/5</div>
                    <div className="text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Why is it free?
                </h4>
                <p className="text-gray-600">
                  We believe every couple should have access to beautiful wedding invitations without breaking the bank. Our mission is to make design accessible to everyone.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Do I need to create an account?
                </h4>
                <p className="text-gray-600">
                  No! You can start designing immediately without any registration. Your designs are saved locally in your browser, and you can export them anytime.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Are there any hidden fees?
                </h4>
                <p className="text-gray-600">
                  Absolutely not. Everything is 100% free - no trials, no subscriptions, no premium tiers. What you see is what you get, forever.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I use this for commercial purposes?
                </h4>
                <p className="text-gray-600">
                  Yes! All designs you create are yours to use however you like, including for commercial purposes. No attribution required.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Create Your Dream Invitation?</h3>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of couples who've created beautiful invitations with us
            </p>
            <Link to={RouteEditor}>
              <Button className="px-8 py-6 text-lg bg-white text-violet-600 hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all">
                Get Started Free - No Sign Up Required
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing