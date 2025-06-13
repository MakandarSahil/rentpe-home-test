"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, MessageSquare, Users, Building, Sparkles } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".contact-item")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-in")
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Get in touch via email",
      contact: "hello@rentp.com",
      href: "mailto:hello@rentp.com",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Speak with our team",
      contact: "+91 12345 67890",
      href: "tel:+911234567890",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      subtitle: "Our headquarters",
      contact: "WeWork Galaxy, 43, Residency Road\nBangalore, Karnataka 560025",
      href: "#",
      color: "from-purple-400 to-pink-500",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 text-cyan-400">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wider uppercase">Get in Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Let's Build</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to join the rental revolution? Let's discuss how RentP can help grow your business or investment
            portfolio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="contact-item opacity-0 translate-x-20 transition-all duration-1000">
              <h3 className="text-3xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Whether you're a potential vendor, investor, or partner, we'd love to hear from you. Our team is here to
                answer your questions and explore opportunities together.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((item, index) => (
                <div
                  key={index}
                  className="contact-item opacity-0 translate-x-20 transition-all duration-1000 flex items-start space-x-4 group"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="h-7 w-7 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-lg">{item.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{item.subtitle}</p>
                    <a
                      href={item.href}
                      className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent hover:text-white transition-colors duration-300 whitespace-pre-line`}
                    >
                      {item.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact Options */}
            <div
              className="contact-item opacity-0 translate-x-20 transition-all duration-1000 space-y-4"
              style={{ animationDelay: "400ms" }}
            >
              <h4 className="font-semibold text-white text-lg">Quick Contact</h4>
              <div className="space-y-3">
                {[
                  { icon: Users, text: "Become a Vendor Partner", color: "hover:border-cyan-400/50" },
                  { icon: Building, text: "Investor Relations", color: "hover:border-purple-400/50" },
                  { icon: MessageSquare, text: "General Inquiries", color: "hover:border-green-400/50" },
                ].map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start border-white/20 text-white hover:bg-white/10 ${option.color} transition-all duration-300`}
                  >
                    <option.icon className="mr-3 h-4 w-4" />
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="contact-item opacity-0 translate-y-20 transition-all duration-1000 bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-white mb-8">Send us a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400/50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400/50 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 12345 67890"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400/50 transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company/Organization
                      </label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Enter company name"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400/50 transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                      I am interested as a *
                    </label>
                    <Select onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-cyan-400/50 transition-colors duration-300">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20">
                        <SelectItem value="vendor">Rental Vendor/Business Owner</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="partner">Strategic Partner</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="delivery">Delivery Partner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your requirements, questions, or how we can help you..."
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-cyan-400/50 transition-colors duration-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-black font-semibold text-lg py-6 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                    size="lg"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-gray-400 text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Terms of Service
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
