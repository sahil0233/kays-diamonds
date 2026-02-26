import { Gem, Sparkles, Award, Clock, Shield, Truck } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Custom Manufacturing',
  description: 'Diamond jewelry manufacturer and exporter with 7+ years of combined industry experience, serving B2B clients across international markets.',
  alternates: {
    canonical: 'https://www.kaysdiamonds.com/custom-manufacturing'
  },
  openGraph: {
    title: 'Custom Manufacturing | Kays Diamonds',
    description: 'Diamond jewelry manufacturer and exporter with 7+ years of combined industry experience, serving B2B clients across international markets.',
    url: 'https://www.kaysdiamonds.com/custom-manufacturing',
    // images: [
    //   {
    //     url: '/og-about.jpg',   // make a custom image for this page, or remove and it'll use layout default
    //     width: 1200,
    //     height: 630,
    //     alt: 'Kays Diamonds Jewellery Manufacturing Facility'
    //   }
    // ]
  }
}

const features = [
  {
    icon: Gem,
    title: "Premium Materials",
    description: "We source only the finest ethically-sourced diamonds and precious metals for your custom pieces.",
  },
  {
    icon: Sparkles,
    title: "Expert Craftsmanship",
    description: "Our master artisans bring over 25 years of experience to every custom creation.",
  },
  {
    icon: Award,
    title: "Quality Certified",
    description: "All pieces meet international quality standards with full certification.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Reliable production schedules ensure your orders are delivered on time, every time.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Every piece undergoes rigorous quality control before shipping.",
  },
  {
    icon: Truck,
    title: "Global Shipping",
    description: "Secure worldwide shipping with full insurance and tracking.",
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "Share your design requirements and specifications with our team.",
  },
  {
    step: "02",
    title: "Design & Prototype",
    description: "Our designers create detailed CAD models and prototypes for approval.",
  },
  {
    step: "03",
    title: "Manufacturing",
    description: "Skilled craftsmen bring your design to life with precision.",
  },
  {
    step: "04",
    title: "Quality Check",
    description: "Rigorous inspection ensures every piece meets our high standards.",
  },
  {
    step: "05",
    title: "Delivery",
    description: "Secure packaging and worldwide shipping to your doorstep.",
  },
];

const CustomManufacturingPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="section-padding relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/custom-manufacturing-bg.jpg"
            alt="Custom jewelry manufacturing"
            className="w-full h-full object-cover"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="container-main relative z-10 text-center text-primary-foreground">
          <h1 className="text-display mb-6">Custom Jewellery Manufacturing</h1>
          <p className="text-body-large text-primary-foreground/90 max-w-2xl mx-auto">
            Serving global brands, startups, and designers with structured, reliable manufacturing.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-caption text-muted-foreground mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-heading">Our Commitment to Excellence</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-card rounded-sm border border-border card-hover">
                <feature.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-display text-primary  text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-secondary/20">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-caption text-muted-foreground mb-4 block">
              How It Works
            </span>
            <h2 className="text-heading">Our Manufacturing Process</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-display text-xl">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main text-center">
          <h2 className="text-heading mb-6">Ready to Create Something Special?</h2>
          <p className="text-body text-muted-foreground mb-10 max-w-xl mx-auto">
            Let's discuss your custom jewelry requirements and bring your vision to life.
          </p>
          <a href="https://wa.me/918239279999" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
            Start Your Project
          </a>
        </div>
      </section>
    </>
  );
};

export default CustomManufacturingPage;
