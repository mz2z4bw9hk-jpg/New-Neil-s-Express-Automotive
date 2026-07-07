import { Hero } from '../components/home/Hero';
import { TrustMarquee } from '../components/home/TrustMarquee';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { Process } from '../components/home/Process';
import { WhyUs } from '../components/home/WhyUs';
import { Testimonials } from '../components/home/Testimonials';
import { VisitBand } from '../components/home/VisitBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ServicesGrid />
      <Process />
      <WhyUs />
      <Testimonials />
      <VisitBand />
    </>
  );
}
