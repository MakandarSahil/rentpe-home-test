"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email us",
      value: "contact@rentp.com",
      description: "Get in touch with our team",
    },
    {
      icon: Phone,
      title: "Call us",
      value: "+91 12345 67890",
      description: "Speak with our experts",
    },
    {
      icon: MapPin,
      title: "Visit us",
      value: "Bangalore, India",
      description: "123 Business Park, Koramangala",
    },
    {
      icon: Clock,
      title: "Business hours",
      value: "Mon-Fri 9AM-6PM IST",
      description: "We're here to help",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Contact us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business with intelligent rental solutions? Let's discuss your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 animate-on-scroll translate-y-8 transition-all duration-1000">
            <div className="bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-light text-gray-900 mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First name *
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last name *
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company name
                    </label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                      I'm interested in *
                    </label>
                    <Select value={formData.interest} onValueChange={(value) => handleChange("interest", value)}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer platform</SelectItem>
                        <SelectItem value="vendor">Vendor platform</SelectItem>
                        <SelectItem value="delivery">Delivery network</SelectItem>
                        <SelectItem value="enterprise">Enterprise solutions</SelectItem>
                        <SelectItem value="partnership">Partnership opportunities</SelectItem>
                        <SelectItem value="investment">Investment opportunities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    required
                    rows={5}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Send message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="animate-on-scroll translate-y-8 transition-all duration-1000 delay-200">
            <div className="bg-white p-8 shadow-sm h-full">
              <h3 className="text-2xl font-light text-gray-900 mb-8">Get in touch</h3>
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-blue-600 font-medium mb-1">{item.value}</p>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  {["LinkedIn", "Twitter", "Facebook", "Instagram"].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
