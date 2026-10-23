import { useState, useEffect } from "react";

const intensityOptions = ["ALL", "BEGINNER", "INTERMEDIATE", "INTENSE"];

function Classes({ redRoom }) {
  const [day, setDay] = useState("MON");
  const [filter, setFilter] = useState("ALL");

  // Classes retrieved from the PostgreSQL database
  const [classes, setClasses] = useState([]);

  // Track API loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch classes from the Express API when the component mounts
  useEffect(() => {
    const controller = new AbortController();

    async function fetchClasses() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/classes`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to load classes");
        }

        const data = await response.json();
        setClasses(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchClasses();

    // Cancel the request when the component unmounts
    return () => controller.abort();
  }, []);

  // Filter database classes by selected day and intensity
  const dayClasses = classes.filter((item) => item.day === day);

  const filteredClasses =
    filter === "ALL"
      ? dayClasses
      : dayClasses.filter((item) => item.intensity === filter);

  const accentColor = redRoom ? "text-[#ff0000]" : "text-[#c40000]";
  const accentBorder = redRoom ? "border-[#ff0000]" : "border-[#c40000]";

  return (
    <section
      id="classes"
      className={`
        scroll-mt-[120px] px-5 py-20 text-[#f5f5f1]
        transition-colors duration-400
        md:px-6 md:py-24
        lg:px-[6%] lg:py-[120px]
        ${redRoom ? "bg-[#1a0000]" : "bg-[#1e1e1e]"}
      `}
    >
      {/* SECTION HEADER */}
      <div
        className="
          mb-10 flex flex-col items-start gap-6
          md:mb-16
          lg:mb-20 lg:flex-row lg:items-end lg:justify-between
        "
      >
        <div>
          <p
            className={`
              mb-2 font-body text-xs font-bold tracking-[2px]
              lg:mb-4 lg:text-sm lg:tracking-[4px]
              ${accentColor}
            `}
          >
            PROGRAMMING
          </p>

          <h2
            className="
              font-heading text-[clamp(36px,12.8vw,48px)]
              font-normal leading-none
              md:text-[60px]
              lg:text-[72px]
            "
          >
            FIND YOUR
            <br />
            BREAKING POINT.
          </h2>
        </div>

        {/* DAY SELECTOR */}
        <div className="flex flex-wrap gap-2 lg:mb-2 lg:gap-4">
          {[
            { label: "TODAY", value: "MON" },
            { label: "TOMORROW", value: "TUE" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDay(option.value)}
              aria-pressed={day === option.value}
              className={`
                cursor-pointer border px-4 py-2.5
                font-body text-xs font-bold tracking-[2px]
                transition-all duration-300
                focus-visible:outline-2 focus-visible:outline-offset-4
                ${
                  redRoom
                    ? "focus-visible:outline-[#ff0000]"
                    : "focus-visible:outline-white"
                }
                ${
                  day === option.value
                    ? redRoom
                      ? "border-[#ff0000] text-[#ff0000] shadow-[0_0_12px_rgba(255,0,0,0.55)]"
                      : "border-white text-white shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                    : "border-transparent text-[#a0a0a0] hover:border-white/30 hover:text-white"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* INTENSITY FILTER */}
      <div className="mb-8 flex flex-wrap gap-3 md:mb-10">
        {intensityOptions.map((option) => {
          const isActive = filter === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={isActive}
              className={`
                cursor-pointer border bg-transparent
                px-4 py-2.5
                font-body text-[11px] font-bold tracking-[1.5px]
                transition-all duration-300
                focus-visible:outline-2 focus-visible:outline-offset-4
                ${
                  redRoom
                    ? `
                      border-[#ff0000] text-[#ff0000]
                      hover:bg-[#ff0000]/10
                      focus-visible:outline-[#ff0000]
                    `
                    : `
                      border-white text-white
                      hover:bg-white/10
                      focus-visible:outline-white
                    `
                }
                ${
                  isActive
                    ? redRoom
                      ? "shadow-[0_0_8px_#ff0000,0_0_20px_rgba(255,0,0,0.55)]"
                      : "shadow-[0_0_8px_white,0_0_20px_rgba(255,255,255,0.5)]"
                    : "shadow-none"
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* LOADING AND ERROR STATES */}
      {loading && (
        <p className="py-12 text-center text-sm text-[#a0a0a0]">
          Loading classes...
        </p>
      )}

      {error && (
        <p role="alert" className="py-12 text-center text-sm text-[#ff0000]">
          Unable to load classes. Please try again later.
        </p>
      )}

      {/* CLASSES GRID */}
      {!loading && !error && (
        <div
          className="
            grid grid-cols-1 gap-4
            md:grid-cols-2
            lg:grid-cols-3 lg:gap-6
          "
        >
          {filteredClasses.map((item) => {
            const isFull = item.spots === 0;

            return (
              <article
                key={item.id}
                className={`
                  flex min-h-[210px] min-w-0
                  flex-col justify-between
                  border border-white/5 p-6
                  transition-[border-color,background-color] duration-300
                  md:p-6 lg:p-8
                  ${redRoom ? "bg-[#0a0000]" : "bg-[#121212]"}
                  ${
                    isFull
                      ? "opacity-75 hover:border-[#444]"
                      : redRoom
                        ? "hover:border-[#ff0000]"
                        : "hover:border-[#c40000]"
                  }
                `}
              >
                {/* CARD TOP */}
                <div
                  className="
                    mb-6 flex flex-wrap items-start
                    justify-between gap-3
                    lg:mb-10
                  "
                >
                  <div className="min-w-0">
                    <p
                      className="
                        mb-2 font-body text-xs font-medium
                        tracking-[1px] text-[#a0a0a0]
                        lg:tracking-[2px]
                      "
                    >
                      {item.time} — {item.day}
                    </p>

                    <h3
                      className="
                        font-heading text-2xl font-normal leading-none
                        lg:text-4xl
                      "
                    >
                      {item.name}
                    </h3>
                  </div>

                  {/* INTENSITY BADGE */}
                  <span
                    className={`
                      shrink-0 border px-2 py-1
                      font-body text-[10px] font-bold tracking-[1px]
                      lg:px-3 lg:py-1.5
                      ${
                        isFull
                          ? "border-white/10 bg-[#262626] text-[#a0a0a0]"
                          : item.intensity === "BEGINNER" && !redRoom
                            ? "border-white/20 bg-white/10 text-white"
                            : redRoom
                              ? "border-[#ff0000]/20 bg-[#ff0000]/10 text-[#ff0000]"
                              : "border-[#c40000]/20 bg-[#c40000]/10 text-[#c40000]"
                      }
                    `}
                  >
                    {isFull ? "FULL" : item.intensity}
                  </span>
                </div>

                {/* CARD BOTTOM */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                    <i
                      aria-hidden="true"
                      className={`
                        fa-solid
                        ${isFull ? "fa-circle-info" : "fa-user-group"}
                        ${isFull ? "text-[#a0a0a0]" : accentColor}
                      `}
                    />

                    <span>
                      {isFull ? "Waitlist Open" : `${item.spots} spots left`}
                    </span>
                  </div>

                  <a
                    href="#membership"
                    className={`
                      border-b pb-1
                      font-body text-xs font-bold tracking-[2px]
                      transition-colors duration-300
                      ${
                        isFull
                          ? "border-[#555] text-[#a0a0a0]"
                          : `
                            text-[#f5f5f1]
                            ${accentBorder}
                            ${
                              redRoom
                                ? "hover:text-[#ff0000]"
                                : "hover:text-[#c40000]"
                            }
                          `
                      }
                    `}
                  >
                    {isFull ? "WAITLIST" : "BOOK"}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredClasses.length === 0 && (
        <p className="py-12 text-center text-sm text-[#a0a0a0]">
          No classes match this intensity.
        </p>
      )}
    </section>
  );
}

export default Classes;
