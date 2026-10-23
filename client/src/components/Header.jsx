import { useState } from "react";

function Header({ redRoom, setRedRoom }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between gap-2 bg-[#121212]/95 px-3 text-[#f5f5f1] transition-colors duration-300 lg:h-20 lg:px-12">
      {/* Logo */}
      <a
        href="#"
        className="shrink-0 font-heading text-[22px] tracking-[1px] lg:text-4xl lg:tracking-[4px]"
      >
        <span
          className={`transition-all duration-400 ${
            redRoom
              ? "text-[#ff3030] [text-shadow:0_0_6px_rgba(255,0,0,0.5),0_0_15px_rgba(255,0,0,0.25)]"
              : "text-[#c40000]"
          }`}
        >
          RED
        </span>
        <span>LINE</span>
      </a>

      {/* Navigation and RED ROOM */}
      <div className="ml-auto flex items-center gap-1 lg:gap-12">
        {/* Navigation */}
        <nav
          id="primary-navigation"
          className={`absolute top-full left-0 w-full border-t border-white/10 bg-[#121212]/95 px-5 py-4 lg:static lg:w-auto lg:border-0 lg:bg-transparent lg:p-0 ${
            menuOpen ? "block" : "hidden lg:block"
          }`}
        >
          <ul className="flex flex-wrap justify-center gap-5 lg:gap-8">
            {[
              ["TRAINERS", "#trainers"],
              ["CLASSES", "#classes"],
              ["MEMBERSHIP", "#membership"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="text-xs tracking-[2px] transition-colors duration-300 hover:text-[#c40000] lg:text-sm"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* RED ROOM Toggle */}
        <div className="flex items-center gap-2 lg:gap-3 mr-4">
          <label
            htmlFor="red-room-toggle"
            className="cursor-pointer text-[11px] whitespace-nowrap lg:text-xs"
          >
            RED ROOM
          </label>

          <input
            id="red-room-toggle"
            type="checkbox"
            checked={redRoom}
            onChange={(event) => setRedRoom(event.target.checked)}
            className="relative h-5 w-10 shrink-0 cursor-pointer appearance-none rounded-full bg-white/10 transition-colors duration-300 before:absolute before:top-1 before:left-1 before:h-3 before:w-3 before:rounded-full before:bg-[#a0a0a0] before:transition-transform before:duration-300 checked:bg-red-900/40 checked:before:translate-x-5 checked:before:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-11 w-8 shrink-0 items-center justify-center text-xl lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* CTA */}
      <a
        href="#classes"
        className="shrink-0 bg-[#c40000] px-2 py-2.5 text-[10px] font-semibold whitespace-nowrap transition-colors duration-300 hover:bg-red-600 sm:px-3 lg:px-8 lg:py-3 lg:text-[13px] lg:tracking-[1px]"
      >
        BOOK A CLASS
      </a>
    </header>
  );
}

export default Header;
