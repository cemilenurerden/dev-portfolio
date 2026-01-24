import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Links } from './components/Links';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
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

      />

      <main className="main-content">
        {/* Hero Section */}
        <Hero
          name="Cemile"
          resumeUrl="/cv.pdf"
        />

        {/* Links Section */}
        <Links />

        {/* About Me Section */}
        <About />

        {/* Projects Section */}
        <Projects />

        {/* Blog Section */}
        <Blog />

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
