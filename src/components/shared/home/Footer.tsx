import { Twitter, GitlabIcon as GitHub, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "Features", href: "#features" },
    { name: "Templates", href: "#templates" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const resources = [
    { name: "Blog", href: "#" },
    { name: "Career Tips", href: "#" },
    { name: "Resume Guide", href: "#" },
    { name: "Examples", href: "#" },
    { name: "FAQ", href: "#faq" },
  ];

  const socialIcons = [
    { Icon: Twitter, href: "#r", label: "Twitter" },
    { Icon: GitHub, href: "#r", label: "GitHub" },
    { Icon: Linkedin, href: "#r", label: "LinkedIn" },
  ];

  return (
    <footer
      id="footer"
      className="bg-white pb-10 pt-20 transition-colors duration-300 dark:bg-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="animate__animated animate__fadeInUp">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              AI Resume
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Craft the perfect resume with AI-powered tools and professional
              templates.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-gray-400 transition-colors hover:text-purple-500"
                  aria-label={`Visit our ${label} page`}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 transition-colors hover:text-purple-500 dark:text-gray-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="animate__animated animate__fadeInUp">
            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-gray-600 transition-colors hover:text-purple-500 dark:text-gray-400"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 md:mb-0">
              © 2024 AI Resume. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-gray-600 transition-colors hover:text-purple-500 dark:text-gray-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 transition-colors hover:text-purple-500 dark:text-gray-400"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 transition-colors hover:text-purple-500 dark:text-gray-400"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
