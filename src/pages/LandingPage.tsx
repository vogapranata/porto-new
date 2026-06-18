import Navigation from '../components/public/Navigation'
import Hero from '../components/public/Hero'
import About from '../components/public/About'
import Skills from '../components/public/Skills'
import ExperienceSection from '../components/public/Experience'
import Projects from '../components/public/Projects'
import Gallery from '../components/public/Gallery'
import Contact from '../components/public/Contact'
import Footer from '../components/public/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <ExperienceSection />
      <Projects />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  )
}
