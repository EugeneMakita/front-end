import Link from "next/link"
import BrandLogo from "@/components/brand-logo"

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]

export default function AuthFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/[0.06]">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Top section */}
        <div className="flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between">
          <BrandLogo className="text-white shrink-0 [&>svg]:h-16 [&>svg]:w-16" href="/create-account" />

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-white/[0.06] py-6">
          <span className="text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} asesley, Inc.
          </span>

          <div className="flex items-center gap-3">
            {/* X / Twitter */}
            <a
              href="#"
              className="text-white/30 transition-colors hover:text-white/60"
              aria-label="X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <span className="text-white/15">|</span>
            {/* LinkedIn */}
            <a
              href="#"
              className="text-white/30 transition-colors hover:text-white/60"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
