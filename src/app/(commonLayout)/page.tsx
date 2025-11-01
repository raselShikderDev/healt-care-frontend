import HeroSection from "@/components/modules/home/hero";
import OurSolutions from "@/components/modules/home/solutions";
import OurSpecialties from "@/components/modules/home/specialty";
import Testimonials from "@/components/modules/home/testimonial";
import TopRatedDoctors from "@/components/modules/home/topRatedDoctor";
import Head from "next/head";


export default function Home() {
  return (
    < >
      <Head>
        <title>AI-Pwoerd healthcare - Consult with country's best doctor</title>
        <meta name="description" content="Discover top-rated doctors tailored to your needs with cor at-powered bealthcare platform, Get persmalized recommendations and book appointments effortlessly." />
        <meta name="viewport" content="width-device-width, initial-scale-1" />
      </Head>
      <main>
        <HeroSection />
        <OurSpecialties />
        <TopRatedDoctors />
        <OurSolutions />
        <Testimonials/>
      </main>
    </>
  );
}
