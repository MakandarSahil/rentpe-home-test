import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800  text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Copyright */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            <span className="text-white font-medium">&copy; 2025 Tiyara Innovations. All rights reserved.</span>
          </p>

          {/* Right: Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            {[
              { label: "Privacy Policy", href: "#privacy" },
              { label: "Terms of Service", href: "#terms" },
              { label: "Cookie Policy", href: "#cookies" },
              { label: "Accessibility", href: "#accessibility" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-white hover:text-blue-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
