"use client";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Ryan Patel",
    company: "Canada",
    content: "We’ve worked with multiple suppliers, but they stands out for their attention to detail. Stone quality, finishing, and packaging are up to standards.",
    rating: 5,
    image: "/assets/testimonials/ryan-patel-photo.webp",
  },
    {
    id: 2,
    name: "Jessica Miller",
    company: "USA",
    content: "There was a small delay of 2 days but pics were shared before shipping so it was fine. Quality was worth waiting.",
    rating: 4,
    image: "/assets/testimonials/jessica-miller-photo.webp",
  },
  {
    id: 3,
    name: "Javed Sheikh",
    company: "Dubai",
    content: "We have been sourcing from them for over a year now. Quality has been consistent and delivery timelines are mostly on point.",
    rating: 5,
    image: "/assets/testimonials/javed-sheikh-photo.webp",
  },
    {
    id: 4,
    name: "Kunal Shah",
    company: "Australia",
    content: "We were launching a custom name pendant collection, and Sahil was flexible with the first order quantity. Quality matched expectations and the overall experience was very genuine.",
    rating: 5,
    image: "/assets/testimonials/kunal-shah-photo.webp",
  },

];

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAutoAdvanced = useRef(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      onSelect();
    };

    setCount(api.scrollSnapList().length);
    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !sectionRef.current || hasAutoAdvanced.current) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoAdvanced.current) {
          hasAutoAdvanced.current = true;
          timeoutId = setTimeout(() => {
            api.scrollNext();
          }, 500);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [api]);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-caption text-muted-foreground mb-4 block">
            Testimonials
          </span>
          <h2 className="text-heading mb-4">Our Happy Clients</h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Trusted by jewelry businesses worldwide for quality, reliability, and excellence
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="bg-card p-8 rounded-sm border border-border">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-primary/30 mb-6" />

                    {/* Content */}
                    <p className="text-body text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-display text-muted-foreground font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="md:mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={
                    index === current
                      ? "h-2.5 w-2.5 rounded-full bg-foreground"
                      : "h-2.5 w-2.5 rounded-full bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
