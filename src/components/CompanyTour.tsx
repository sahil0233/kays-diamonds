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
            {/* Thumbnail */}
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&auto=format&fit=crop&q=80"
              alt="Kay's Diamond factory tour"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-300" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary-foreground rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-foreground/80 text-background text-sm rounded-sm">
              3:45
            </div>
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
