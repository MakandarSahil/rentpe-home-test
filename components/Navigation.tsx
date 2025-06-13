"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href?: string
  dropdown?: boolean
  items?: { title: string; href: string }[]
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems: NavItem[] = [
    {
      title: "What we do",
      dropdown: true,
      items: [
        { title: "Customer Platform", href: "#platform-customer" },
        { title: "Vendor Platform", href: "#platform-vendor" },
        { title: "Delivery Network", href: "#platform-delivery" },
        // { title: "Enterprise Solutions", href: "#solutions" },
      ],
    },
    // { title: "Why RentPe", href: "#value-proposition" },
    {
      title: "Who we are",
      dropdown: true,
      items: [
        { title: "Our Story", href: "#about" },
        { title: "Leadership", href: "#team" },
        { title: "Investors", href: "#investors" },
      ],
    },
    { title: "Insights", href: "#insights" },
    // { title: "Careers", href: "#careers" },
  ]

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b font-[MyFont-Medium]",
        scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo and mobile menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none lg:hidden mr-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center text-2xl font-semibold text-black">
              rent<span className="text-blue-600">pe</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) =>
              item.dropdown && item.items ? (
                <div key={index} className="relative group">
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-3 w-56 bg-white shadow-xl rounded-md border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                    <div className="py-2">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href ?? "#"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href ?? "#"}
                  className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
                >
                  {item.title}
                </Link>
              )
            )}
          </div>

          {/* Actions: visible on all screens */}
          <div className="flex items-center space-x-4">
            <Button variant={"theme1"} className="hidden lg:inline-flex">
              Get Started
            </Button>
            <Link href="#get-started" className="lg:hidden">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 shadow-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="lg:hidden pt-2 pb-4 space-y-4 transition-all">
            {navItems.map((item, index) => (
              <div key={index} className="px-2">
                {item.dropdown && item.items ? (
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none text-sm text-gray-700 hover:text-blue-700">
                      {item.title}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 ml-3 space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href ?? "#"}
                          className="block text-sm text-gray-600 hover:text-blue-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className="block text-sm text-gray-700 hover:text-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
