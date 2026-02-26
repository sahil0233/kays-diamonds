import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Factory Video',
  description: 'From sourcing to finishing, every step happens under one roof.\nBuilt for consistency. Designed for scale.',
  alternates: {
    canonical: 'https://kaysdiamonds.com/factory-video'
  },
  openGraph: {
    title: 'Factory Video | Kays Diamonds',
    description: 'From sourcing to finishing, every step happens under one roof.\nBuilt for consistency. Designed for scale.',
    url: 'https://kaysdiamonds.com/factory-video',
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
const videos = [
  {
    id: 1,
    title: "Our Factory Tour",
    description: "A closer look at the people, process, and precision behind every piece we create."
  },
];

const FactoryVideo = () => {
  return (
    <>
      <section className="section-padding">
        <div className="container-main">
        </div>

        {/* Featured Video */}
        <div className="mb-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="relative h-[72vw] sm:h-[60vw] md:h-[40vw] bg-muted overflow-hidden">
            <video
              src="/assets/factory-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
                <div className="absolute bottom-20 lg:bottom-40 right-6 lg:right-35 text-primary-foreground">
                  <h2 className="font-semibold text-xl lg:text-4xl tracking-wide mb-3">{videos[0].title}</h2>
                  <a
                    href="https://wa.me/8239279999"
                    className="inline-flex items-center justify-center rounded-sm bg-foreground px-1 md:px-5 py-2 text-xs font-medium text-primary shadow-sm transition-transform transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    CONNECT WITH US
                  </a>
                </div>
          </div>
                    <div className="text-center mt-4">
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              A closer look at the people, process, and precision behind every piece we create.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FactoryVideo;
