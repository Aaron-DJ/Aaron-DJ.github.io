import ImageGrid from "./ImageGrid";
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "./ThemeContext";

// Theme toggle button component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors"
      style={{
        color: "var(--color-text-muted)",
        backgroundColor: "var(--color-bg-muted)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// Main layout component
const Layout = () => {
  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* Navigation */}
      <nav
        className="p-4 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-medium">Aaron Jacobsen</div>
          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="hover:opacity-70 transition-opacity hidden sm:block"
            >
              Projects
            </a>
            <a
              href="#about"
              className="hover:opacity-70 transition-opacity hidden sm:block"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:opacity-70 transition-opacity hidden sm:block"
            >
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto py-16 px-4 md:py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Aaron Jacobsen</h1>
        <p
          className="text-lg mt-6 max-w-2xl"
          style={{ color: "var(--color-text-muted)" }}
        >
          Software Engineer specializing in AWS and networking looking to expand
          to embedded systems, and hardware in the automotive world
        </p>

        <div className="flex gap-4 mt-8">
          <a
            href="/resume.pdf#view=FitH"
            className="px-5 py-2 border rounded transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>

        <div
          className="flex gap-4 mt-8"
          style={{ color: "var(--color-text-muted)" }}
        >
          <a
            href="https://github.com/Aaron-DJ"
            target="_blank"
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/aaron-jacobsen-661534210/"
            target="_blank"
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:contact@aaron.david.jacobsen.com"
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <Mail size={20} />
          </a>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Side Projects</h2>
        </div>
        <ImageGrid />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 px-4 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">About</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div>
              <p className="mb-4" style={{ color: "var(--color-text-muted)" }}>
                Software engineer specialized in AWS and Networking looking to
                expand towards embedded systems.
              </p>
              <p style={{ color: "var(--color-text-muted)" }}>
                I have automotive experience in academic and personal projects,
                from designing complex circuit boards to building custom turbo
                systems.
              </p>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AWS",
                    "PCB Design",
                    "Automotive Systems",
                    "Automotive Wiring",
                    "Embedded Programming",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: "var(--color-tag-bg)",
                        color: "var(--color-tag-text)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-4 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Contact</h2>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:contact@aaronjacobsen.com"
              className="flex items-center gap-2 px-5 py-2 border rounded transition-colors hover:opacity-80"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              <Mail size={18} />
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/aaron-jacobsen-661534210/"
              target="_blank"
              className="flex items-center gap-2 px-5 py-2 text-white rounded transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-6 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div
          className="max-w-5xl mx-auto px-4 text-center text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          <p>© {new Date().getFullYear()} Aaron Jacobsen</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
