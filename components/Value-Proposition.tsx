"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Users, Clock, Shield } from "lucide-react"

export default function ValueProposition() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const benefits = [
    {
      icon: TrendingUp,
      title: "Maximize Revenue",
      description: "Transform idle inventory into consistent revenue streams with our intelligent pricing algorithms.",
      stats: "Smart pricing tools",
    },
    {
      icon: Users,
      title: "Expand Reach",
      description: "Access millions of potential customers through our fast-growing rental marketplace.",
      stats: "Pan-India presence",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "AI-driven tools to automate inventory, scheduling, and customer management.",
      stats: "Operational efficiency",
    },
    {
      icon: Shield,
      title: "Ensure Security",
      description: "Verified users, secure payments, and insurance support for peace of mind.",
      stats: "Safety-first platform",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 animate-on-scroll translate-y-8 transition-all duration-1000">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Why Choose RentPe?</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Built for vendors, optimized for growth — RentPe empowers your rental business with tools that drive success.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="animate-on-scroll translate-y-8 transition-all duration-1000 hover:shadow-xl border-border"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <CardDescription className="mb-3">{benefit.description}</CardDescription>
                <span className="text-sm font-medium text-blue-600">{benefit.stats}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-12 rounded-xl animate-on-scroll translate-y-8 transition-all duration-1000">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl font-semibold mb-4">Launch your rental business with confidence</h3>
              <p className="text-blue-100 text-lg mb-6">
                Be among the first vendors to experience RentPe’s advanced rental ecosystem. Early adopters get priority access and dedicated onboarding support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary">
                  Schedule a demo
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-xl font-semibold mb-1">No Upfront Investment</div>
                <div className="text-blue-200 text-sm">Launch with zero setup fees</div>
              </div>
              <div>
                <div className="text-xl font-semibold mb-1">Priority Onboarding</div>
                <div className="text-blue-200 text-sm">Expert-led setup assistance</div>
              </div>
              <div>
                <div className="text-xl font-semibold mb-1">Exclusive Beta Access</div>
                <div className="text-blue-200 text-sm">Shape the platform roadmap</div>
              </div>
              <div>
                <div className="text-xl font-semibold mb-1">24/7 Partner Support</div>
                <div className="text-blue-200 text-sm">Always-on assistance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
