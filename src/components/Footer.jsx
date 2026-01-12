import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Github, Twitter, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import {
  RouteHome,
  RouteTemplate,
  RoutePricing,
  RouteContact,
  RouteEditor,
} from "@/helpers/RouteNames";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Templates", to: RouteTemplate },
      { label: "Editor", to: RouteEditor },
      { label: "Pricing", to: RoutePricing },
    ],
    company: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: RouteContact },
      { label: "Help Center", to: "/help" },
    ],
    legal: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to={RouteHome} className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-violet-600">Wedding Cards.</h2>
            </Link>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Create beautiful wedding invitations with our easy-to-use online editor. Free, fast, and stunning results.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-100 hover:bg-violet-200 text-violet-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-100 hover:bg-violet-200 text-violet-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-100 hover:bg-violet-200 text-violet-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-violet-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-violet-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-violet-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Get Updates</h4>
              <p className="text-xs text-gray-600 mb-3">Follow us on social media for the latest templates and tips!</p>
              <Link to={RouteTemplate}>
                <Button className="w-full px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors">
                  View Templates →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} Wedding Cards. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for celebrating love
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
