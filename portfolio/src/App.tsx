import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Links } from './components/Links';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';



/* ============================================
   App Component
   ============================================ */

function App() {
  return (
    <div className="app">
      <Navbar
        logoText="Cemile.dev"
        ctaText="Let's Talk"
        ctaHref="#contact"
      />

      <main className="main-content">
        {/* Hero Section */}
        <Hero
          name="Cemile"
          title="A Software Engineering Student building"
          highlightedText="scalable solutions"
          description="and pixel-perfect interfaces."
          resumeUrl="/cv.pdf"
        />

        {/* Links Section */}
        <Links />

        {/* About Me Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
