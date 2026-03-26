'use client';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import FeaturesSection from '../components/FeatureSection/FeaturesSection';
import Waitlist1 from '../components/Waitlist/Waitlist1';
import FAQ2 from '../components/FAQ/FAQ2';
import Compare8 from "../components/Table/Compare8";

export default function Home() {
  return (
    <div className="noder-app">
      <Header />
      <div className="flex w-full flex-col divide-y divide-border">
        <Hero />
        <FeaturesSection />
        <Compare8 />
        <FAQ2 />
        <Waitlist1 />
      </div>
      <Footer />
    </div>
  );
}
