import Link from "next/link";

const CTASection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-90" />

      {/* Content */}
      {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Your Next Deal?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          No more second-guessing payments. Whether you're a freelancer, business owner, or individual—PayShri gives you complete control over your transactions. Try it out today!
          </p>
          <Link
            href="/product/add-product"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Create A Deal
          </Link>
        </div>
      </div> */}
    </section>
  );
};

export default CTASection;