import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Links } from './components/Links';
import { Projects } from './components/Projects';



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


        {/* Projects Section */}
        <Projects />

        {/* Resume Section */}
        <section id="resume" className="section">
          <h2>Resume</h2>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <h2>Contact</h2>
        </section>
      </main>
    </div>
  );
}

export default App;
