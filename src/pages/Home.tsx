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
    <main>
      <HeroSection />
      <StatsSection />
      <LogoStrip />
      <ProblemSolutionSection />
      <ServicesHighlight />
      <KeyAdvantages />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}

export default Home