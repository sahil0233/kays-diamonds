import { getCollectionsWithMeta } from "@/sanity/lib/fetchers";
import Link from "next/link";
import Image from "next/image";



const Footer = async () => {
  const collections = await getCollectionsWithMeta();
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="container-main section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-wide font-medium text-foreground">
              Kays Diamonds
            </Link>
            <p className="mt-4 text-small text-primary-foreground/80 leading-relaxed">
              A diamond jewelry manufacturer known for executing detailed and challenging custom designs with precision.
            </p>
            <div className="mt-4 flex gap-4">
              <a 
                href="https://www.instagram.com/kaysdiamonds_export/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary-foreground/80 transition-colors"
              >
                <Image 
                  src="/assets/icons/instagram-icon.svg" 
                  alt="Instagram" 
                  width={24} 
                  height={24}
                />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-caption text-foreground mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/collections" className="text-small link-underline text-foreground">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-small link-underline text-foreground">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/factory-video" className="text-small link-underline text-foreground">
                  Factory Video
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-caption text-foreground mb-4">Collections</h4>
            <ul className="space-y-3">
              {collections
                .filter((collection) => Boolean(collection.slug?.current))
                .map((collection) => (
                  <li key={collection._id}>
                    <Link
                      href={`/collections/${encodeURIComponent(
                        collection.slug!.current
                      )}`}
                      className="text-small link-underline text-foreground"
                    >
                      {collection.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-caption text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-small">
              <li className="text-primary-foreground/80">
                Office
              </li>
              <li>
                105, Amrut Shanti, mahidharpura<br />
                Surat, Gujrat - 395003
              </li>
              <li className="pt-2">
                <a href="mailto:sahil.gangwani2024@gmail.com" className="link-underline">
                  sahil.gangwani2024@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-small text-primary-foreground/80">
            © {new Date().getFullYear()} Kays Diamonds. All rights reserved.
          </p>
          {/* <div className="flex gap-6">
            <a href="#" className="text-small text-foreground link-underline">
              Privacy
            </a>
            <a href="#" className="text-small text-foreground link-underline">
              Terms
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
