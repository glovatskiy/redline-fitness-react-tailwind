import heroImage from "../assets/images/hero-img.webp";

function Hero({ redRoom }) {
  return (
    <section
      className="
        relative flex h-[650px] items-center justify-center
        bg-cover bg-center bg-no-repeat
        px-5 pt-[108px] text-[#f5f5f1]
        md:h-[700px] md:px-6
        lg:h-[850px] lg:pt-0
      "
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="relative z-10 w-full max-w-[1100px] text-center">
        {/* HERO TITLE */}
        <h1
          className="
            mb-4 font-heading font-normal
            text-[clamp(40px,16vw,60px)]
            leading-[0.95] tracking-normal
            md:mb-6 md:text-[72px] md:leading-[0.9]
            lg:text-[140px] lg:leading-[0.95] lg:tracking-[8px]
          "
        >
          TRAIN IN A
          <br />
          DIFFERENT
          <br className="md:hidden lg:block" />
          <span
            className={`
              block transition-[color,text-shadow] duration-400
              md:inline lg:block
              ${
                redRoom
                  ? "text-[#ff3030] [text-shadow:0_0_10px_rgba(255,0,0,0.7),0_0_25px_rgba(255,0,0,0.4),0_0_50px_rgba(255,0,0,0.2)]"
                  : "text-[#f5f5f1]"
              }
            `}
          >
            LIGHT.
          </span>
        </h1>

        {/* SUBTITLE */}
        <p
          className="
            mb-10 font-body text-sm leading-[1.6]
            tracking-[1.5px]
            [text-shadow:0_0_8px_rgba(0,0,0,0.9)]
            md:mb-12 md:text-base md:tracking-[1.6px]
            lg:text-xl lg:tracking-[2.5px]
          "
        >
          PREMIUM TRAINING. ZERO DISTRACTIONS.
        </p>

        {/* DISCOVER LINK */}
        <a
          href="#trainers"
          className="
            group inline-flex flex-col items-center gap-4
            font-body text-xs font-semibold tracking-[3px]
            text-[#f5f5f1]
            transition-colors duration-300
            hover:text-[#ff3030]
          "
        >
          <span>DISCOVER REDLINE</span>

          {/* BOUNCING V ARROW */}
          <span
            aria-hidden="true"
            className={`
              block h-4 w-4
              border-r-[3px] border-b-[3px]
              origin-center

              animate-[heroArrowBounce_1.2s_infinite]

              transition-[filter] duration-300

              group-hover:[filter:drop-shadow(0_0_4px_#ff0000)_drop-shadow(0_0_10px_#ff0000)_drop-shadow(0_0_18px_rgba(255,0,0,0.7))]

              motion-reduce:animate-none
              motion-reduce:rotate-45

              ${
                redRoom
                  ? "border-[#ff0000] [filter:drop-shadow(0_0_4px_#ff0000)_drop-shadow(0_0_10px_#ff0000)_drop-shadow(0_0_18px_rgba(255,0,0,0.7))]"
                  : "border-[#c40000]"
              }
            `}
          />
        </a>
      </div>
    </section>
  );
}

export default Hero;
