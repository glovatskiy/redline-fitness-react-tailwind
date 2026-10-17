function Editorial({ redRoom }) {
  return (
    <section
      className={`
        px-5 py-24 text-center text-[#f5f5f1]
        transition-colors duration-400
        md:px-6 md:py-32
        lg:px-[6%] lg:py-48
        ${redRoom ? "bg-[#0a0000]" : "bg-[#121212]"}
      `}
    >
      <h2
        className="
          mx-auto max-w-[1152px]
          font-heading font-normal
          text-[36px] leading-none tracking-[-0.9px]
          md:text-[60px] md:tracking-[-1.5px]
          lg:text-[96px] lg:tracking-[-2px]
        "
      >
        BEYOND THE SURFACE.
        <br />
        INSIDE THE{" "}
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
          RED.
        </span>
      </h2>
    </section>
  );
}

export default Editorial;
