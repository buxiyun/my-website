export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-4">
          <div className="text-2xl font-bold text-blue-600">The Leap Union</div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mt-20 py-32 bg-gradient-to-br from-blue-900 to-blue-500 text-white text-center">
        <div className="max-w-6xl mx-auto px-5">
          <span className="inline-block bg-white/15 px-6 py-3 rounded-full text-base font-medium mb-8">
            The Leap Union
          </span>
          <h1 className="text-6xl font-bold mb-6">
            Your Global
            <br />
            Growth Partner
          </h1>
          <p className="text-2xl mb-10 opacity-95 tracking-wide">
            Website is currently under construction.
            <br />
            We&apos;ll be launching soon.
          </p>
          <div className="mt-12 text-lg">
            Contact:{" "}
            <a
              href="mailto:marketing@theleapunion.com"
              className="text-white underline"
            >
              marketing@theleapunion.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-5">
          <p>&copy; 2026 The Leap Union. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
