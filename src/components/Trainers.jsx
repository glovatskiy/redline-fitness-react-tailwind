import marcusImage from "../assets/images/marcus-thorne-trainer.webp";
import elenaImage from "../assets/images/elena-rossi-trainer.webp";
import davidImage from "../assets/images/david-chen-trainer.webp";

const trainers = [
  {
    id: 1,
    name: "MARCUS THORNE",
    specialization: "STRENGTH",
    image: marcusImage,
    alt: "Marcus Thorne, strength trainer",
    description:
      "Ex-Special Forces. Focused on progressive overload and unbreakable mental discipline.",
  },
  {
    id: 2,
    name: "ELENA ROSSI",
    specialization: "HIIT",
    image: elenaImage,
    alt: "Elena Rossi, HIIT trainer",
    description:
      "Metabolic conditioning expert. Specialized in high-intensity cardiovascular performance.",
  },
  {
    id: 3,
    name: "DAVID CHEN",
    specialization: "MOBILITY",
    image: davidImage,
    alt: "David Chen, mobility trainer",
    description:
      "Elite recovery specialist. Blending structural integrity with functional range of motion.",
  },
];

function Trainers({ redRoom }) {
  return (
    <section
      id="trainers"
      className={`
        scroll-mt-[120px]
        px-5 py-20
        text-[#f5f5f1]
        transition-colors duration-400
        md:px-6 md:py-24
        lg:px-[6%] lg:py-[120px]
        ${redRoom ? "bg-[#0a0000]" : "bg-[#121212]"}
      `}
    >
      {/* SECTION HEADER */}
      <div className="mb-12 md:mb-16 lg:mb-20">
        <p
          className={`
            mb-2 font-body text-xs font-bold tracking-[1px]
            md:tracking-[2px]
            lg:mb-4 lg:text-sm lg:tracking-[4px]
            ${redRoom ? "text-[#ff0000]" : "text-[#c40000]"}
          `}
        >
          THE ELITE
        </p>

        <h2
          className="
            font-heading font-normal leading-none
            text-[clamp(36px,12.8vw,48px)]
            md:text-[60px]
            lg:text-[72px]
          "
        >
          MEET THE PEOPLE
          <br />
          WHO PUSH YOU.
        </h2>
      </div>

      {/* TRAINERS GRID */}
      <div
        className="
          grid grid-cols-1 gap-12
          md:grid-cols-2 md:gap-8
          lg:grid-cols-3 lg:gap-12
        "
      >
        {trainers.map((trainer) => (
          <article key={trainer.id} className="group min-w-0">
            {/* TRAINER IMAGE */}
            <div
              className="
                relative mb-6 aspect-[3/4] overflow-hidden
                lg:mb-8
              "
            >
              <img
                src={trainer.image}
                alt={trainer.alt}
                loading="lazy"
                className="
                  block h-full w-full object-cover
                  grayscale
                  transition-[filter,transform] duration-700 ease-in-out
                  group-hover:grayscale-0
                  group-hover:scale-105
                "
              />

              {/* IMAGE GRADIENT */}
              <div
                aria-hidden="true"
                className={`
                  pointer-events-none absolute inset-x-0 bottom-0
                  transition-all duration-400
                  ${
                    redRoom
                      ? "h-full bg-[linear-gradient(to_top,rgba(60,0,0,0.9)_0%,rgba(50,0,0,0.5)_25%,rgba(40,0,0,0.15)_60%,transparent_100%)]"
                      : "h-[35%] bg-gradient-to-t from-[rgba(18,18,18,0.9)] to-transparent"
                  }
                `}
              />

              {/* SPECIALIZATION LABEL */}
              <span
                className={`
                  absolute bottom-5 left-5 z-10
                  font-body text-xs font-bold tracking-[2px]
                  lg:bottom-6 lg:left-6
                  ${redRoom ? "text-[#ff0000]" : "text-[#c40000]"}
                `}
              >
                {trainer.specialization}
              </span>
            </div>

            {/* TRAINER NAME */}
            <h3
              className="
                mb-1 font-heading text-[30px] font-normal
                lg:mb-2 lg:text-[40px]
              "
            >
              {trainer.name}
            </h3>

            {/* TRAINER DESCRIPTION */}
            <p
              className="
                font-body text-sm font-light
                leading-[1.7] text-[#a0a0a0]
              "
            >
              {trainer.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Trainers;
