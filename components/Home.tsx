import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen px-6 md:px-20">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Dreiser Morales
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-400 mb-6">
          Backend-Focused Full Stack Developer
        </h2>

        <p className="max-w-2xl text-gray-300 mb-8">
          I build scalable backend systems using NestJS, PostgreSQL and modern web technologies.
        </p>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-black rounded-xl">
            View Projects
          </button>
          <button className="px-6 py-3 border border-gray-500 rounded-xl">
            Download CV
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 border-t border-gray-800">
        <h3 className="text-3xl font-semibold mb-6">About Me</h3>

        <p className="max-w-3xl text-gray-400 leading-relaxed">
          Backend-focused developer with hands-on experience building real-world
          applications with authentication, payments, cloud storage and relational databases.
          I focus on clean architecture, security and scalable systems.
        </p>
      </section>

      {/* TECH STACK */}
      <section className="py-24 border-t border-gray-800">
        <h3 className="text-3xl font-semibold mb-12">Tech Stack</h3>

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xl font-semibold mb-4">Backend</h4>
            <ul className="space-y-2 text-gray-400">
              <li>NestJS</li>
              <li>PostgreSQL</li>
              <li>TypeORM</li>
              <li>JWT</li>
              <li>Swagger</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Frontend</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Next.js</li>
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>TypeScript</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">DevOps</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Vercel</li>
              <li>Railway</li>
              <li>Render</li>
              <li>Cloudinary</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 border-t border-gray-800">
        <h3 className="text-3xl font-semibold mb-12">Projects</h3>

        <div className="space-y-20">

          {/* Project 1 */}
          <div className="border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-semibold">
                Renta-Fácil — Rental Management Platform
              </h4>
            
              <span className="text-xs bg-indigo-600 px-3 py-1 rounded-full">
                Full-Stack Production Concept
              </span>
            </div>
            
            <p className="text-gray-400 mb-4">
              Full-stack rental platform with authentication, escrow logic, 
              contract validation and protected payment flow.
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Tech: Next.js, NestJS, PostgreSQL, JWT, Escrow Logic, Cloudinary
            </p>
            
            <div className="flex gap-4 mb-6">
              <Link
                href="/rentafacil"
                className="px-5 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
              >
                View Live Platform
              </Link>
            
              <a
                href="https://github.com/your-repo"
                target="_blank"
                className="px-5 py-2 border border-gray-600 rounded-lg hover:border-gray-400 transition"
              >
                GitHub
              </a>
            </div>
            
            <div className="text-gray-500 text-sm space-y-2">
              <p>• Modular NestJS backend architecture</p>
              <p>• Role-based authentication (Owner / Guest)</p>
              <p>• Escrow-style payment logic</p>
              <p>• Relational database design</p>
              <p>• Production-ready folder structure</p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="border border-gray-800 rounded-2xl p-8">
            <h4 className="text-2xl font-semibold mb-4">
              Financial Management API
            </h4>

            <p className="text-gray-400 mb-4">
              REST API for managing transactions, users and reports with role-based access.
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Tech: NestJS, PostgreSQL, TypeORM
            </p>

            <div className="flex gap-4">
              <button className="px-5 py-2 bg-white text-black rounded-lg">
                API Docs
              </button>
              <button className="px-5 py-2 border border-gray-600 rounded-lg">
                GitHub
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 border-t border-gray-800">
        <h3 className="text-3xl font-semibold mb-6">
          Let’s Work Together
        </h3>

        <p className="text-gray-400 mb-6">
          Feel free to reach out if you'd like to collaborate or discuss opportunities.
        </p>

        <div className="space-y-2 text-gray-400">
          <p>Email: moralesdreiser5@gmail.com</p>
          <p>GitHub | LinkedIn</p>
        </div>
      </section>

    </main>
  );
}
