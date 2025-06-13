// components/Hero.jsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Users, Shield, Zap, PlayCircle, Star } from "lucide-react"
import { Iphone15Pro } from "@/components/ui/Iphone15pro"
import { LineShadowText } from "./ui/LineShadowText"
import { HeroVideoDialog } from "./ui/HeroVideoDialog"
import { useState, memo } from "react"
import ServiceShowcase from "./ServiceShowcase"
import ValueProposition from "./Value-Proposition"
import Contact from "./contact"

const Hero = memo(function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex flex-col md:flex-row items-center min-h-screen py-8 md:py-12 gap-8">

            {/* Left Section */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6 md:space-y-8">

              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-sm text-white/90 font-medium">100% Trusted Platform</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 select-none">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                  Rent <LineShadowText className="italic" shadowColor={"white"}>Fast</LineShadowText>,
                  <span className="block bg-clip-text text-blue-400">
                    Anytime, <LineShadowText className="italic" shadowColor={"white"}>Anywhere</LineShadowText>
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-lg mx-auto md:mx-0">
                  Trusted rental marketplace. From cameras to cars, furniture to electronics - get what you need, when you need it.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button variant={"theme1"} asChild size="lg">
                  <Link target="_blank" href="https://d1gw9htlygu8b6.cloudfront.net/">Start Renting Now</Link>
                </Button>
                <Button size="lg" variant="secondary" onClick={() => setIsVideoOpen(true)}>
                  <h1 className="flex items-center gap-2">Watch Demo <PlayCircle /></h1>
                </Button>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
                {[
                  { icon: Shield, text: "Verified vendors" },
                  { icon: Zap, text: "Instant booking" },
                  { icon: Users, text: "24/7 support" },
                  { icon: Check, text: "Zero hidden fees" }
                ].map(({ icon: Icon, text }, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-white/90">
                    <Icon className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">0+</div>
                  <div className="text-xs text-gray-400">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">0K+</div>
                  <div className="text-xs text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">00K+</div>
                  <div className="text-xs text-gray-400">Items Available</div>
                </div>
              </div>
            </div>

            {/* Right Section: iPhone Mockup */}
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="relative w-[240px] sm:w-[280px] md:w-[320px]">
                <Iphone15Pro
                  className="w-full h-auto drop-shadow-2xl"
                  src="/rentpe-app-preview.png"
                />

                <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                  <div className="text-xs font-semibold text-gray-800">New</div>
                  <div className="text-xs text-gray-600">AI-powered search</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceShowcase />
      <ValueProposition />
      <Contact />

      {isVideoOpen && (
        <>
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
            className="block dark:hidden"
            onClose={() => setIsVideoOpen(false)}
          />
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
            className="hidden dark:block"
            onClose={() => setIsVideoOpen(false)}
          />
        </>
      )}
    </>
  );
});

export default Hero;
