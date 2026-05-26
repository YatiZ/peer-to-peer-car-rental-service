'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Shield,
  Car,
  Lock,
  Star,
  ArrowRight,
} from 'lucide-react'

export default function AboutPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(0)

  const faqs = [
    {
      id: 0,
      question: 'How do I rent a car?',
      answer:
        'Browse available cars, select your desired dates, and complete the booking.',
    },
    {
      id: 1,
      question: 'How do I list my car?',
      answer:
        'Create an account as a host, upload vehicle details, set pricing, and start accepting bookings.',
    },
    {
      id: 2,
      question: 'Is insurance included?',
      answer:
        'Every booking includes insurance protection for both renters and hosts.',
    },
    {
      id: 3,
      question: 'How are payments handled?',
      answer:
        'Payments are securely processed through our platform and transferred automatically.',
    },
  ]

  const stats = [
    { label: '10K+', value: 'Cars Available' },
    { label: '50K+', value: 'Active Users' },
    { label: '100+', value: 'Cities Served' },
    { label: '4.9★', value: 'Average Rating' },
  ]

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Frequent Renter',
      image: '👩‍💼',
      text: 'Amazing experience. Affordable pricing and smooth booking process.',
    },
    {
      name: 'James Rodriguez',
      role: 'Car Owner',
      image: '👨‍💼',
      text: 'I earn passive income every month by listing my car here.',
    },
    {
      name: 'Emma Thompson',
      role: 'Traveler',
      image: '👩‍🦰',
      text: 'Perfect for road trips. Great variety of vehicles and trusted hosts.',
    },
  ]

  const features = [
    {
      title: 'Affordable Pricing',
      description:
        'Save up to 50% compared to traditional rental companies.',
      icon: '💰',
    },
    {
      title: 'Wide Vehicle Selection',
      description:
        'Choose from economy cars, SUVs, luxury vehicles, and more.',
      icon: '🚗',
    },
    {
      title: 'Instant Booking',
      description:
        'Book cars instantly without unnecessary paperwork or delays.',
      icon: '⚡',
    },
    {
      title: 'Flexible Pickup',
      description:
        'Convenient pickup locations and flexible scheduling options.',
      icon: '📍',
    },
  ]

  const trustFeatures = [
    {
      title: 'Verified Users',
      description:
        'All users go through identity verification and screening.',
      icon: Shield,
    },
    {
      title: 'Insurance Protection',
      description:
        'Comprehensive insurance coverage for every booking.',
      icon: Lock,
    },
    {
      title: 'Secure Payments',
      description:
        'Encrypted payments with industry-standard security systems.',
      icon: Lock,
    },
  ]

  return (
    <main className="bg-background overflow-hidden ">
      {/* HERO */}
      <section className="relative">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-28">
            <div className="max-w-xl">
              <div className="inline-flex items-center rounded-full border border-border/50 bg-background/80 px-4 py-2 text-sm text-foreground/70 backdrop-blur mb-6">
                🚗 Trusted by 50,000+ users worldwide
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
                Trusted peer-to-peer car sharing
              </h1>

              <p className="mt-6 text-lg md:text-xl text-foreground/70 leading-relaxed">
                Rent reliable vehicles from local car owners or earn passive
                income by listing your own car.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2">
                  Rent a Car
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button className="px-8 py-4 border border-border/50 bg-background/80 backdrop-blur rounded-2xl font-semibold hover:bg-muted transition inline-flex items-center justify-center gap-2">
                  List Your Car
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-muted/60 to-background p-8 shadow-2xl">
                <div className="h-[420px] rounded-2xl bg-background flex items-center justify-center">
                  <div className="text-center">
                    <Car className="w-24 h-24 text-primary/40 mx-auto mb-4" />
                    <p className="text-foreground/50">
                      Featured Car Showcase
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-muted/30 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                  {stat.label}
                </div>
                <p className="text-foreground/60">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-32">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-5">
          How it works
        </h2>

        <p className="text-lg text-center text-foreground/60 max-w-2xl mx-auto mb-20 leading-relaxed">
          Renting a car has never been easier. Start your journey in four simple
          steps.
        </p>

        <div className="grid md:grid-cols-4 gap-8 lg:gap-10">
          {[
            {
              step: '01',
              title: 'Search Cars',
              desc: 'Browse available vehicles near your location.',
            },
            {
              step: '02',
              title: 'Book Instantly',
              desc: 'Reserve your favorite car in just minutes.',
            },
            {
              step: '03',
              title: 'Pick Up',
              desc: 'Meet the host and collect the vehicle.',
            },
            {
              step: '04',
              title: 'Enjoy Driving',
              desc: 'Travel comfortably with insurance protection.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/50 bg-background/80 backdrop-blur p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="text-primary font-bold mb-3">
                {item.step}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-foreground/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-to-b from-muted/30 to-background border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-5">
            Why people choose us
          </h2>

          <p className="text-lg text-center text-foreground/60 max-w-2xl mx-auto mb-20 leading-relaxed">
            A smarter and more flexible alternative to traditional car rentals.
          </p>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border/50 bg-background/80 backdrop-blur p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-32">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-5">
          Loved by our community
        </h2>

        <p className="text-lg text-center text-foreground/60 max-w-2xl mx-auto mb-20 leading-relaxed">
          Thousands of renters and hosts trust our platform every day.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border/50 bg-background/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">
                  {testimonial.image}
                </div>

                <div>
                  <h3 className="font-bold">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-foreground/70 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-muted/30 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-5">
            Your safety comes first
          </h2>

          <p className="text-lg text-center text-foreground/60 max-w-2xl mx-auto mb-20 leading-relaxed">
            We prioritize secure bookings, verified users, and trusted payments.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {trustFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border/50 bg-background/80 p-8 shadow-sm text-center backdrop-blur hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-28 md:py-32">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-5">
          Frequently asked questions
        </h2>

        <p className="text-lg text-center text-foreground/60 max-w-2xl mx-auto mb-20 leading-relaxed">
          Everything you need to know before booking your next ride.
        </p>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-2xl border border-border/50 bg-background/80 backdrop-blur"
            >
              <button
                onClick={() =>
                  setOpenFaqId(
                    openFaqId === faq.id ? null : faq.id
                  )
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition"
              >
                <h3 className="font-semibold text-lg">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openFaqId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaqId === faq.id && (
                <div className="px-6 pb-6 border-t border-border/50 text-foreground/70 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_40%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to get started?
          </h2>

          <p className="text-lg md:text-xl opacity-90 mb-12">
            Join thousands of users already using our platform today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 rounded-2xl bg-background text-primary font-semibold hover:bg-background/90 transition">
              Start Renting
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/40 hover:bg-white/10 transition font-semibold">
              Become a Host
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Drivr.
              </h3>

              <p className="text-foreground/60 leading-relaxed">
                Trusted peer-to-peer car sharing platform built for modern
                travel.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                For Renters
              </h4>

              <ul className="space-y-3 text-foreground/60">
                <li>Browse Cars</li>
                <li>How It Works</li>
                <li>Safety</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                For Hosts
              </h4>

              <ul className="space-y-3 text-foreground/60">
                <li>List Your Car</li>
                <li>Pricing Guide</li>
                <li>Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Company
              </h4>

              <ul className="space-y-3 text-foreground/60">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-16 pt-8 text-center text-foreground/50">
            © 2026 Drivr. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}