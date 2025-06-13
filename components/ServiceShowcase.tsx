// ServiceShowcase.tsx - Final Optimized Version
"use client";

import React, { useEffect, useRef, useState } from "react";
import CardSwap, { Card, type CardSwapHandle } from "./ui/CardSwap";
import { gsap } from "gsap"; // Ensure GSAP is installed

type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  cards: string[];
  cta: string;
  color: string;
  highlightColor: string;
};

const services: Service[] = [
  {
    id: "vendor",
    title: "Vendor Solutions",
    description: "Maximize your rental business with our powerful vendor tools and marketplace exposure.",
    features: [
      "Real-time inventory management",
      "Automated booking system",
      "Performance analytics dashboard",
      "Secure payment processing",
    ],
    cards: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    cta: "Start Selling",
    color: "bg-blue-600",
    highlightColor: "bg-blue-100",
  },
  {
    id: "customer",
    title: "Customer Experience",
    description: "Discover and rent items with seamless booking and premium support.",
    features: [
      "Personalized recommendations",
      "Instant booking confirmation",
      "24/7 customer support",
      "Flexible cancellation policy",
    ],
    cards: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    cta: "Browse Rentals",
    color: "bg-blue-600",
    highlightColor: "bg-blue-100",
  },
  {
    id: "delivery",
    title: "Delivery Network",
    description: "Efficient logistics solutions for fast and reliable item transportation.",
    features: [
      "Real-time tracking system",
      "Optimized route planning",
      "Secure handling protocols",
      "Flexible scheduling",
    ],
    cards: [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    ],
    cta: "Join Our Fleet",
    color: "bg-blue-600",
    highlightColor: "bg-blue-100",
  },
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const ServiceShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);
  const autoSwapInterval = useRef<NodeJS.Timeout | null>(null);

  const activeService = services[activeIndex];

  const handleServiceChange = (index: number) => {
    if (index === activeIndex || isTransitioning) return;

    setIsTransitioning(true);

    if (autoSwapInterval.current) {
      clearInterval(autoSwapInterval.current);
      autoSwapInterval.current = null;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setActiveIndex(index);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              setIsTransitioning(false);
              startAutoSwap();
            },
          }
        );
      },
    });
  };

  const startAutoSwap = () => {
    if (autoSwapInterval.current) {
      clearInterval(autoSwapInterval.current);
    }
    if (activeService.cards.length > 1) {
      autoSwapInterval.current = setInterval(() => {
        if (!isTransitioning && cardSwapRef.current) {
          cardSwapRef.current.next();
        }
      }, 5000);
    }
  };

  useEffect(() => {
    startAutoSwap();
    return () => {
      if (autoSwapInterval.current) {
        clearInterval(autoSwapInterval.current);
      }
    };
  }, [isTransitioning, activeIndex, activeService.cards.length]);

  return (
    <section className="relative z-10 px-4 py-8 md:py-16 overflow-hidden">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:items-center md:gap-x-24">
        {/* Mobile Section Selector - Above cards */}
        {isMobile && (
          <div className="mb-8 w-full flex justify-center">
            <div className="flex space-x-2 px-1 overflow-x-auto pb-2 scrollbar-hide">
              {services.map((service, i) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceChange(i)}
                  className={`flex-shrink-0 px-4 py-2 text-sm whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-in-out ${i === activeIndex
                    ? `${activeService.color} text-white shadow-md transform scale-105`
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="w-full md:w-1/2 flex justify-center mt-10 mb-10 md:mb-6 md:mt-18"> {/* Increased mb-12 for mobile space */}
          <div className="relative w-full max-w-[320px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[500px] h-[380px] sm:h-[380px] md:h-[480px] lg:h-[550px]">
            <CardSwap
              ref={cardSwapRef}
              delay={99999}
              width="100%"
              height="100%"
              pauseOnHover
              easing="power2.out"
              cardDistance={isMobile ? 20 : 45} // Further fine-tuned for tighter stack on mobile
              verticalDistance={isMobile ? 30 : 55} // Further fine-tuned for tighter stack on mobile
              skewAmount={isMobile ? 1 : 4} // Further reduced skew for minimal distortion
            >
              {activeService.cards.map((src, i) => (
                <Card key={`${activeService.id}-${i}`} className="rounded-xl overflow-hidden">
                  <div className="relative w-full h-full rounded-xl shadow-xl overflow-hidden group">
                    <img
                      src={src}
                      alt={`${activeService.title} image ${i + 1}`}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <div>
                        <span
                          className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${activeService.color} text-white mb-2`}
                        >
                          {activeService.id.toUpperCase()}
                        </span>
                        <h3 className="text-white text-lg font-bold">{activeService.title}</h3>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 md:py-8" ref={contentRef}>
          <div className="max-w-lg mx-auto md:mx-0 md:pl-8">
            {!isMobile && (
              <>
                <span
                  className={`inline-block px-4 py-1.5 text-sm font-semibold tracking-wider ${activeService.highlightColor} text-${activeService.color.replace(
                    "bg-",
                    ""
                  )} rounded-full mb-4`}
                >
                  Our Services
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {activeService.title}
                </h2>
              </>
            )}

            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              {activeService.description}
            </p>

            <ul className="space-y-3 mb-8">
              {activeService.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className={`p-1 rounded-full ${activeService.highlightColor} mr-3 mt-1`}>
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                className={`px-6 py-3 ${activeService.color} hover:${activeService.color.replace(
                  "600",
                  "700"
                )} text-white text-base font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5`}
              >
                {activeService.cta}
              </button>
              <button className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-800 text-base font-semibold rounded-lg shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 bg-white hover:bg-gray-50">
                Learn More
              </button>
            </div>

            {/* Desktop Section Navigation */}
            {!isMobile && (
              <div className="flex flex-wrap gap-2">
                {services.map((service, i) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceChange(i)}
                    className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ease-in-out ${i === activeIndex
                      ? `${activeService.color} text-white shadow-md transform scale-105`
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;