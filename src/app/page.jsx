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
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="compare">
          <Compare8 />
        </section>
        <section id="faq">
          <FAQ2 />
        </section>
        <section id="waitlist">
          <Waitlist1 />
        </section>
      </div>
      <Footer />
    </div>
  );
}
