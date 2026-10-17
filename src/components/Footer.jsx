const socialLinks = [
  {
    name: "Instagram",
    icon: "fa-brands fa-instagram",
    url: "https://www.instagram.com/",
  },
  {
    name: "TikTok",
    icon: "fa-brands fa-tiktok",
    url: "https://www.tiktok.com/",
  },
  {
    name: "Spotify",
    icon: "fa-brands fa-spotify",
    url: "https://open.spotify.com/",
  },
];

const footerLinks = [
  { name: "TRAINERS", url: "#trainers" },
  { name: "SCHEDULE", url: "#classes" },
  { name: "MEMBERSHIP", url: "#membership" },
];

function Footer({ redRoom }) {
  return (
    <footer
      id="footer"
      className={`
        px-5 pt-12 pb-12 text-[#f5f5f1]
        md:px-6 md:pt-16 md:pb-16
        lg:px-[6%] lg:pt-20 lg:pb-8
        transition-colors duration-400
        ${redRoom ? "bg-[#100000]" : "bg-[#080808]"}
      `}
    >
      {/* Main footer */}
      <div
        className="
          flex flex-col items-center gap-8
          border-b-0 pb-8 text-center
          md:flex-row md:flex-wrap
          md:items-start md:justify-between
          md:gap-10 md:pb-12 md:text-left
          lg:gap-12 lg:pb-20
        "
      >
        {/* Brand */}
        <div>
          <a
            href="#"
            aria-label="REDLINE Fitness home"
            className="
              inline-flex font-heading
              text-[30px] leading-none tracking-[4px]
              lg:text-[64px] lg:tracking-[-1px]
            "
          >
            <span
              className={`
                transition-[color,text-shadow] duration-400
                ${
                  redRoom
                    ? "text-[#ff0000] [text-shadow:0_0_30px_rgba(255,0,0,0.6)]"
                    : "text-[#c40000]"
                }
              `}
            >
              RED
            </span>

            <span className="text-[#f5f5f1]">LINE</span>
          </a>

          <p
            className={`
              mt-4 font-body text-xs font-bold
              tracking-[1.5px]
              lg:tracking-[3px]
              ${redRoom ? "text-[#ff0000]" : "text-[#c40000]"}
            `}
          >
            TRAIN IN A DIFFERENT LIGHT.
          </p>

          {/* Social icons */}
          <div
            className="
              mt-6 flex items-center justify-center gap-6
              md:mt-8 md:justify-start
            "
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`
                  inline-flex items-center justify-center
                  text-xl
                  transition-[color,transform,text-shadow]
                  duration-300
                  hover:-translate-y-[3px]
                  hover:text-[#ff0000]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#ff0000]
                  ${
                    redRoom
                      ? "text-[#ff0000] [text-shadow:0_0_15px_rgba(255,0,0,0.5)]"
                      : "text-[#a0a0a0]"
                  }
                `}
              >
                <i className={social.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Footer navigation"
          className="
            flex flex-row flex-wrap
            justify-center gap-5
            md:flex-col md:items-start
            md:gap-5 md:pt-3
          "
        >
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className={`
                font-body text-xs font-bold
                tracking-[0.5px]
                transition-colors duration-300
                hover:text-[#ff0000]
                md:tracking-[2px]
                ${redRoom ? "text-[#f5f5f1]" : "text-[#f5f5f1]"}
              `}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom footer */}
      <div
        className="
          flex flex-col items-center gap-4
          border-t border-white/10 pt-6
          text-center
          md:flex-row md:flex-wrap
          md:items-start md:justify-between
          md:gap-5 md:pt-8 md:text-left
          lg:items-center lg:gap-6
        "
      >
        {/* Location */}
        <p
          className="
            font-body text-xs font-medium
            leading-[1.6] tracking-[0.5px]
            text-[#a0a0a0]
          "
        >
          PRAGUE, CZECH REPUBLIC
        </p>

        {/* Legal links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="
              font-body text-xs font-medium
              tracking-[0.5px] text-[#a0a0a0]
              transition-colors duration-300
              hover:text-[#f5f5f1]
            "
          >
            PRIVACY
          </a>

          <a
            href="#"
            className="
              font-body text-xs font-medium
              tracking-[0.5px] text-[#a0a0a0]
              transition-colors duration-300
              hover:text-[#f5f5f1]
            "
          >
            TERMS
          </a>
        </div>

        {/* Copyright */}
        <p
          className="
            font-body text-xs font-medium
            leading-[1.6] tracking-[0.5px]
            text-[#a0a0a0]
          "
        >
          © 2026 REDLINE PERFORMANCE STUDIO
        </p>
      </div>
    </footer>
  );
}

export default Footer;
