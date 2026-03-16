import SEO from '../components/seo/SEO'
import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/ClientLogoStrip'
import LogoStrip from '../components/sections/LogoStrip'
import ProblemSolutionSection from '../components/sections/ProblemSolutionSection'
import ServicesHighlight from '../components/sections/ServicesHighlight'
import KeyAdvantages from '../components/sections/KeyAdvantages'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

const Home = () => {
  return (
    <>
      <SEO
        title="GriviLabs · Custom Web Development untuk UMKM Indonesia"
        description="GriviLabs adalah tech studio yang membangun website bisnis dari nol menggunakan custom code, bukan template WordPress. Lebih cepat, lebih aman, dan siap tumbuh bersama bisnis Anda."
        canonical="/"
      />
      <HeroSection />
      <StatsSection />
      <LogoStrip />
      <ProblemSolutionSection />
      <ServicesHighlight />
      <KeyAdvantages />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

export default Home
