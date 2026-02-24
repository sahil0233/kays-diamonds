import { Play } from "lucide-react";

const CompanyTour = () => {
  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-caption text-muted-foreground mb-4 block">
            Inside Our Factory
          </span>
          <h2 className="text-heading mb-4">Take a Company Tour</h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            From casting and setting to polishing and quality control, this video showcases how our pieces are made for export standards.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-muted rounded-sm overflow-hidden group cursor-pointer">
            <video
              src="/assets/company-tour.mp4"
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            />
          </div>

          {/* Video Description */}
          <div className="mt-8 text-center">
            <p className="text-body text-muted-foreground">
              Discover how our skilled artisans transform raw materials into stunning jewelry. 
              From design to final polish, every step reflects our commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTour;
