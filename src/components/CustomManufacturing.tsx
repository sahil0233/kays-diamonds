import { Gem, Sparkles, Award} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CustomManufacturing = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container-main">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="w-full flex justify-center md:justify-end mb-8 md:mb-0">
            <Image width={500} height={500} src="/assets/custom-manufacturing.webp" alt="Custom Jewelry Manufacturing" className="w-full md:max-w-md lg:max-w-lg xl:max-w-xl object-cover rounded-lg shadow-lg aspect-[4/3] md:aspect-[3/4] xl:aspect-[4/4]" />

          </div>
          {/* Content */}
          <div className="space-y-4 lg:space-y-8">
            <div>
              <span className="text-caption text-muted-foreground mb-4 block">
                Bespoke Creations
              </span>
              <h2 className="text-2xl lg:text-3xl font-light mb-6">
                Custom Jewelry Manufacturing
              </h2>
              <p className="text-sm lg:text-base leading-relaxed text-muted-foreground mb-6">
                At Kay's Diamond, we specialize in bringing your unique vision to life. 
                Our master craftsmen combine traditional techniques with modern precision 
                to create exceptional pieces tailored to your specifications.
              </p>
              <p className="text-sm lg:text-base text-muted-foreground">
                From concept to creation, we work closely with you to ensure every detail 
                reflects your brand identity and meets the highest standards of quality.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-3 lg:gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Gem className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-1">Premium Materials</h3>
                  <p className="text-sm text-muted-foreground">
                    Ethically sourced diamonds and precious metals
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-1">Expert Craftsmanship</h3>
                  <p className="text-sm text-muted-foreground">
                    Over 5 years of manufacturing excellence
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium mb-1">Quality Certified</h3>
                  <p className="text-sm text-muted-foreground">
                    International quality standards and certifications
                  </p>
                </div>
              </div>
            </div>

            <Link href="/custom-manufacturing" className="btn-primary rounded-full">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomManufacturing;
