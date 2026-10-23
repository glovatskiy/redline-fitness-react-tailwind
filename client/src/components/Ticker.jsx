const tickerText =
  "STRENGTH • HIIT • CONDITIONING • REDLINE • TRAIN DIFFERENT • ";

function Ticker({ redRoom }) {
  const repeatedText = tickerText.repeat(4);

  return (
    <section
      aria-label="Training disciplines"
      className={`
        flex h-12 items-center overflow-hidden
        text-[#f5f5f1]
        transition-colors duration-300
        ${redRoom ? "bg-[#ff0000]" : "bg-[#c40000]"}
      `}
    >
      <div
        className="
          flex w-max items-center gap-3
          whitespace-nowrap
          font-heading text-[18px] tracking-[4px]
          animate-[tickerScroll_20s_linear_infinite]
          motion-reduce:animate-none
        "
      >
        <span className="shrink-0">{repeatedText}</span>

        <span aria-hidden="true" className="shrink-0">
          {repeatedText}
        </span>
      </div>
    </section>
  );
}

export default Ticker;
