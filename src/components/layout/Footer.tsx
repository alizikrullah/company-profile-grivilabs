import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookF, FaGithub } from "react-icons/fa";

const socialLinks = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTiktok, href: "#", label: "TikTok" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

const footerLinks = {
  Halaman: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Teams", path: "/teams" },
  ],
  Blog: [
    { label: "Blog List", path: "/blog" },
    { label: "Tulis Artikel", path: "/blog/create" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/">
              <span className="font-montserrat font-black tracking-[-0.03em] text-2xl">
                Grivi<span style={{ color: "var(--color-accent)" }}>Labs.</span>
              </span>
            </Link>
            <p
              className="font-inter text-sm leading-relaxed mt-4 max-w-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Jasa pembuatan website profesional untuk UMKM Indonesia. Kami bantu bisnis kamu hadir secara digital dengan tampilan yang keren dan performa yang solid.
            </p>
            <p
              className="font-inter text-xs mt-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              📍 Indonesia
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Halaman & Blog Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-montserrat font-black uppercase tracking-widest text-xs mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="font-inter text-sm transition-colors duration-200"
                      style={{ color: "var(--color-text-secondary)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-text-secondary)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hubungi Kami Column */}
          <div>
            <h4
              className="font-montserrat font-black uppercase tracking-widest text-xs mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Hubungi Kami
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:hello@grivilabs.com"
                  className="font-inter text-sm transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                >
                  hello@grivilabs.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-sm transition-colors duration-200"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                >
                  +62 812-3456-7890
                </a>
              </li>
            </ul>

            <h4
              className="font-montserrat font-black uppercase tracking-widest text-xs mb-3 mt-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              Jam Operasional
            </h4>
            <p className="font-inter text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Senin - Minggu (09.00 - 17.00 WIB)
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            className="font-inter text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; {year} GriviLabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}