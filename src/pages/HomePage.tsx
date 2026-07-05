import { Hero } from '../components/home/Hero';
import { TrustMarquee } from '../components/home/TrustMarquee';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { Process } from '../components/home/Process';
import { WhyNeils } from '../components/home/WhyNeils';
import { Testimonials } from '../components/home/Testimonials';
import { VisitBand } from '../components/home/VisitBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ServicesGrid />
      <Process />
      <WhyNeils />
      <Testimonials />
      <VisitBand />
    </>
  );
}
