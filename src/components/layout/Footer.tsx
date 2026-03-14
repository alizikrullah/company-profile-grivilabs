import { Link } from "react-router-dom";

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
  Akun: [
    { label: "Login", path: "/login" },
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
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
              className="font-inter text-xs mt-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              📍 Indonesia
            </p>
          </div>

          {/* Links Columns */}
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
                        e.currentTarget.style.color =
                          "var(--color-text-secondary)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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