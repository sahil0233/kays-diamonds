"use client";
import { Globe, Users, Package, Award } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const stats = [
  { icon: Globe, value: 20, label: "International Markets", suffix: "+" },
  { icon: Users, value: 35, label: "Ongoing Business Clients", suffix: "+" },
  { icon: Package, value: 10000, label: "Jewelry Pieces Delivered", suffix: "+", compact: true },
  { icon: Award, value: 7, label: "Years of Industry Experience", suffix: "+" },
];

const countries = [
  "United States", "United Kingdom", "France", "Germany", "Italy",
  "Singapore", "UAE", "Australia", "Canada", "Japan",
  "South Korea", "Thailand", "Malaysia", "Saudi Arabia", "Qatar",
];

const GlobalCustomers = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || startCount) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [startCount]);

  const formatValue = useMemo(() => {
    return (value: number, end: number, suffix = "", compact = false) => {
      if (!compact) {
        return `${Math.floor(value)}${suffix}`;
      }

      const inThousands = value / 1000;
      const formatted = inThousands >= 10 ? Math.floor(inThousands).toString() : inThousands.toFixed(1);
      return `${formatted.replace(/\.0$/, "")}K${suffix}`;
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-primary text-primary-foreground">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-caption text-primary-foreground/70 mb-4 block">
            Global Presence
          </span>
          <h2 className="text-heading mb-4">Our Customers Across the World</h2>
          <p className="text-body text-primary-foreground/80 max-w-2xl mx-auto">
            Exporting premium jewelry to businesses worldwide, building lasting partnerships 
            across continents
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary-foreground/80" />
              <div className="font-display text-4xl md:text-5xl font-light mb-2">
                <CountUp
                  start={startCount}
                  end={stat.value}
                  suffix={stat.suffix}
                  compact={stat.compact}
                  format={formatValue}
                />
              </div>
              <p className="text-sm text-primary-foreground/70 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Countries */}
        <div className="text-center">
          <h3 className="font-display text-xl mb-8">Export Destinations</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary-foreground/10 rounded-sm text-sm"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type CountUpProps = {
  start: boolean;
  end: number;
  suffix?: string;
  compact?: boolean;
  format: (value: number, end: number, suffix?: string, compact?: boolean) => string;
};

const CountUp = ({ start, end, suffix, compact, format }: CountUpProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    const duration = 2000;
    let rafId = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = end * progress;

      setValue(nextValue);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [start, end]);

  return <>{format(value, end, suffix, compact)}</>;
};

export default GlobalCustomers;
