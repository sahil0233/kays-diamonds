import Image from "next/image";
import Hero from "../components/Hero";
import CustomManufacturing from "../components/CustomManufacturing";
import Testimonials from "../components/Testimonials";
import GlobalCustomers from "../components/GlobalCustomers";
import QuickContact from "../components/QuickContact";
import CompanyTour from "../components/CompanyTour";

export default function Home() {
  return (
    <>
          <Hero />
      <CustomManufacturing />
      <Testimonials />
      <GlobalCustomers />
      <QuickContact />
      <CompanyTour />
    </>
  );
}
