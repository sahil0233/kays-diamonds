import Image from "next/image";

const About = () => {
  return (
    <>
      <section className="section-padding">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-caption text-muted-foreground mb-4">
              Our Story
            </p>
            <h1 className="text-display mb-6">
              We are a diamond jewellery manufacturer,
              <br />
              <em>crafting brilliance with care</em>
            </h1>
            <p className="text-body-large text-muted-foreground">
              We design, source, and craft fine diamond jewellery with a focus
              on precision, ethical practices, and enduring beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="pb-20">
        <div className="container-main">
          <div className="aspect-[21/9] overflow-hidden bg-muted">
            <Image
              src="/assets/about-us-image.jpg"
              width={500}
              height={300}
              alt="Diamond jewellery workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-card">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-primary text-2xl font-normal mb-6">Our Philosophy</h2>
              <div className="space-y-4 text-body text-muted-foreground">
                <p>
                  Every piece begins with a question:
                  how can we create jewellery that is exceptional in beauty,
                  responsibly made, and cherished for a lifetime?
                </p>
                <p>
                  We believe true luxury is defined by clarity, balance, and
                  integrity. This philosophy guides our design process, our
                  material selection, and our commitment to craftsmanship.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-primary text-2xl font-normal mb-6">Craftsmanship</h2>
              <div className="space-y-4 text-body text-muted-foreground">
                <p>
                  Our master jewellers combine time-honored techniques with
                  modern precision. Each piece is meticulously crafted using
                  responsibly sourced diamonds and precious metals.
                </p>
                <p>
                  The result is jewellery that tells a story—of skilled hands,
                  trusted sources, and moments it will celebrate for generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-heading mb-6">Our Values</h2>
            <p className="text-body text-muted-foreground">
              These principles guide everything we do, from design
              to delivery and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-subheading mb-4">Responsibility</h3>
              <p className="text-body text-muted-foreground">
                We prioritize ethical sourcing and transparent supply chains,
                ensuring every diamond meets rigorous standards.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-subheading mb-4">Precision</h3>
              <p className="text-body text-muted-foreground">
                Our craftsmanship is defined by meticulous setting,
                balanced proportions, and exceptional finishing.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-subheading mb-4">Trust</h3>
              <p className="text-body text-muted-foreground">
                We stand behind every piece with clear certification
                and a commitment to service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-main text-center">
          <h2 className="text-heading mb-6">
            Let's create something together
          </h2>
          <p className="text-body-large opacity-90 mb-10 max-w-xl mx-auto">
            Whether you're creating a signature piece or a full collection,
            we'd love to hear from you.
          </p>
          <a
            href="https://wa.me/8239279999"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary-foreground text-primary text-sm uppercase tracking-widest font-medium transition-all hover:bg-primary-foreground/90"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
