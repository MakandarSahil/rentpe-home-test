"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { toast, Toaster } from "sonner";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const instaUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, { threshold: 0.1 });

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setStatus("sending");

    try {
      await emailjs.send(`${serviceId}`, `${templateId}`, formData, `${publicKey}`);
      setStatus("success");
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: "",
      });
      setTimeout(() => {
        setStatus("idle");
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly.",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email us",
      value: "contact@rentp.com",
      description: "Get in touch with our team",
      href: "mailto:contact@rentp.com",
    },
    {
      icon: Phone,
      title: "Call us",
      value: "+91 12345 67890",
      description: "Speak with our experts",
      href: "tel:+911234567890",
    },
    {
      icon: MapPin,
      title: "Visit us",
      value: "Bangalore, India",
      description: "123 Business Park, Koramangala",
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Business hours",
      value: "Mon-Fri 9AM–6PM IST",
      description: "We're here to help",
    },
  ];

  const socials = [
    {
      label: "LinkedIn",
      href: `${linkedInUrl}`,
      color: "hover:text-blue-700",
      svg: (
        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    // {
    //   label: "Twitter",
    //   href: "https://twitter.com/rentpe",
    //   color: "hover:text-blue-500",
    //   svg: (
    //     <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
    //       <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    //     </svg>
    //   ),
    // },
    {
      label: "Facebook",
      href: `${facebookUrl}`,
      color: "hover:text-blue-600",
      svg: (
        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: `${instaUrl}`,
      color: "hover:text-pink-600",
      svg: (
        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50">
      <Toaster position="top-center" richColors />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Contact us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business with intelligent rental solutions? Let's discuss your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 animate-on-scroll translate-y-8 transition-all duration-1000">
            <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-100">
              <h3 className="text-2xl font-light text-gray-900 mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name *
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                      className={`${isSubmitted && !formData.firstName ? "border-red-500" : ""}`}
                    />
                    {isSubmitted && !formData.firstName && (
                      <p className="text-red-500 text-xs">This field is required</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name *
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                      className={`${isSubmitted && !formData.lastName ? "border-red-500" : ""}`}
                    />
                    {isSubmitted && !formData.lastName && (
                      <p className="text-red-500 text-xs">This field is required</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      className={`${isSubmitted && !formData.email ? "border-red-500" : ""}`}
                    />
                    {isSubmitted && !formData.email && (
                      <p className="text-red-500 text-xs">Please enter a valid email</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 12345 67890"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                      I'm interested in *
                    </label>
                    <Select
                      value={formData.interest}
                      onValueChange={(value) => handleChange("interest", value)}
                      name="interest"
                      required
                    >
                      <SelectTrigger className={`${isSubmitted && !formData.interest ? "border-red-500" : ""}`}>
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
                    {isSubmitted && !formData.interest && (
                      <p className="text-red-500 text-xs">Please select an option</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    required
                    rows={5}
                    className={`${isSubmitted && !formData.message ? "border-red-500" : ""}`}
                    placeholder="Tell us about your requirements..."
                  />
                  {isSubmitted && !formData.message && (
                    <p className="text-red-500 text-xs">Please enter your message</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Follow Us section in main form area */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Follow us</h4>
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`text-gray-400 ${social.color} transition-colors duration-200`}
                    >
                      {social.svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="animate-on-scroll translate-y-8 transition-all duration-1000 delay-200">
            <div className="bg-white p-8 shadow-sm rounded-xl border border-gray-100 h-full">
              <h3 className="text-2xl font-light text-gray-900 mb-8">Get in touch</h3>
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-blue-600 font-medium mb-1 hover:text-blue-800 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-blue-600 font-medium mb-1">{item.value}</p>
                      )}
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Follow Us section in sidebar */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Follow us</h4>
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`text-gray-400 ${social.color} transition-colors duration-200`}
                    >
                      {social.svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}