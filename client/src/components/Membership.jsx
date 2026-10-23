const membershipPlans = [
  {
    id: 1,
    name: "DROP IN",
    price: "$35",
    period: "/class",
    features: ["Single class access", "Full amenities", "No commitment"],
    buttonText: "PURCHASE",
    featured: false,
  },
  {
    id: 2,
    name: "REDLINE 8",
    price: "$180",
    period: "/mo",
    priceNote: "$22.50 PER CLASS",
    features: [
      "8 classes per month",
      "10% off retail",
      "Priority booking",
      "Guest pass per month",
    ],
    buttonText: "SELECT PLAN",
    featured: true,
  },
  {
    id: 3,
    name: "UNLIMITED",
    price: "$285",
    period: "/mo",
    features: [
      "Unlimited classes",
      "15% off retail",
      "Redline Recovery access",
      "Free hand wraps",
    ],
    buttonText: "SELECT PLAN",
    featured: false,
  },
];

function Membership({ redRoom }) {
  return (
    <section
      id="membership"
      className={`
        scroll-mt-[120px]
        px-5 py-20 text-[#f5f5f1]
        transition-colors duration-400
        md:px-6 md:py-24
        lg:px-[6%] lg:py-[120px]
        ${redRoom ? "bg-[#1a0000]" : "bg-[#1e1e1e]"}
      `}
    >
      {/* Section heading */}
      <div className="mb-10 text-center md:mb-16 lg:mb-24">
        <p
          className={`
            mb-2 font-body text-xs font-bold tracking-[1px]
            md:tracking-[2px]
            lg:mb-4 lg:text-sm lg:tracking-[4px]
            ${redRoom ? "text-[#ff0000]" : "text-[#c40000]"}
          `}
        >
          PRICING
        </p>

        <h2
          className="
            font-heading font-normal leading-none
            text-[clamp(36px,12.8vw,48px)]
            md:text-[60px]
            lg:text-[72px]
          "
        >
          CHOOSE YOUR COMMITMENT.
        </h2>
      </div>

      {/* Membership cards */}
      <div
        className="
          grid grid-cols-1 gap-8
          md:grid-cols-2 md:gap-x-6
          lg:grid-cols-3 lg:gap-8
        "
      >
        {membershipPlans.map((plan) => (
          <article
            key={plan.id}
            className={`
              relative flex min-w-0 flex-col justify-between
              border p-8 text-center
              transition-[border-color,background-color,box-shadow]
              duration-300
              md:text-left
              lg:min-h-[520px] lg:p-12
              ${redRoom ? "bg-[#0a0000]" : "bg-[#121212]"}
              ${
                plan.featured
                  ? `
                    z-10 border-2
                    md:scale-100
                    lg:scale-105
                    ${
                      redRoom
                        ? "border-[#ff0000] shadow-[0_0_25px_rgba(255,0,0,0.2)]"
                        : "border-[#c40000]"
                    }
                  `
                  : `
                    border-white/5
                    hover:border-white/20
                  `
              }
              ${
                plan.id === 3
                  ? "md:col-span-2 md:text-center lg:col-span-1 lg:text-left"
                  : ""
              }
            `}
          >
            {/* Most popular badge */}
            {plan.featured && (
              <span
                className={`
                  absolute top-0 left-1/2
                  -translate-x-1/2 -translate-y-1/2
                  whitespace-nowrap px-4 py-2
                  font-body text-[10px] font-bold
                  tracking-[2px] text-[#f5f5f1]
                  md:text-[11px]
                  lg:px-6 lg:tracking-[3px]
                  ${redRoom ? "bg-[#ff0000]" : "bg-[#c40000]"}
                `}
              >
                MOST POPULAR
              </span>
            )}

            <div>
              {/* Plan name */}
              <h3
                className="
                  mb-4 font-heading text-[30px]
                  font-normal
                  lg:mb-6 lg:text-[48px]
                "
              >
                {plan.name}
              </h3>

              {/* Price */}
              <p
                className="
                  font-body text-[36px] font-bold leading-none
                  lg:text-[60px]
                "
              >
                {plan.price}

                <span
                  className="
                    ml-1 text-base font-normal
                    text-[#a0a0a0]
                  "
                >
                  {plan.period}
                </span>
              </p>

              {/* Price note */}
              {plan.priceNote && (
                <p
                  className={`
                    mt-3 font-body text-xs
                    font-bold tracking-[2px]
                    ${redRoom ? "text-[#ff0000]" : "text-[#c40000]"}
                  `}
                >
                  {plan.priceNote}
                </p>
              )}

              {/* Features */}
              <ul
                className="
                  mt-6 flex flex-col gap-3
                  border-t border-white/10 pt-6
                  font-body text-sm leading-[1.6]
                  text-[#a0a0a0]
                  lg:mt-10 lg:gap-4 lg:pt-10
                "
              >
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Plan button */}
            <button
              type="button"
              className={`
                mt-8 w-full cursor-pointer
                border px-5 py-4
                font-body text-xs font-bold
                tracking-[2px]
                transition-all duration-300
                lg:mt-12 lg:py-5
                ${
                  plan.featured
                    ? `
                      border-transparent text-[#f5f5f1]
                      ${
                        redRoom
                          ? `
                            bg-[#ff0000]
                            hover:bg-[#ff3030]
                            hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]
                          `
                          : `
                            bg-[#c40000]
                            hover:bg-[#ff0000]
                          `
                      }
                    `
                    : `
                      border-white/20 bg-transparent
                      text-[#f5f5f1]
                      hover:bg-[#f5f5f1]
                      hover:text-[#121212]
                    `
                }
              `}
            >
              {plan.buttonText}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Membership;
