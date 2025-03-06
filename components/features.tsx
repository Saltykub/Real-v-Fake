import { BadgeCheck, MessageSquareWarning, UsersRound } from "lucide-react";

const features = [
  {
    name: "Crowdsourced Fraud Reports.",
    description:
      "Stay informed with real-time scam alerts from every online shopping platforms. See reports, avoid fake stores, and shop with confidence.",
    icon: UsersRound,
  },
  {
    name: "Report & Expose Scams.",
    description:
      "Encounter a suspicious store? Report it instantly to warn others and contribute to a safer online shopping experience.",
    icon: MessageSquareWarning,
  },
  {
    name: "Community-Verified Trust.",
    description:
      "Leverage insights from a trusted shopper network to verify store credibility before making a purchase.",
    icon: BadgeCheck,
  },
];

export default function Features() {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 flex flex-col gap-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">
                Community-Driven Solution
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Shop Safe Together
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Join a growing community that keeps online shopping safe—report
                fraud, verify store credibility, and help others make informed
                decisions.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 size-5 text-indigo-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a href="#" className="text-right font-semibold text-indigo-600">
              Explore now&rarr;
            </a>
          </div>
          <div className="">
            <img
              alt="Product screenshot"
              src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
