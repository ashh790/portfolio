import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faDatabase,
  faLaptopCode,
  faLock,
  faMobileScreen,
  faRocket,
  faServer,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { profile } from "../data/profile";

const serviceIcons: Record<string, IconDefinition> = {
  laptop: faLaptopCode,
  server: faServer,
  database: faDatabase,
  lock: faLock,
  mobile: faMobileScreen,
  rocket: faRocket,
};

const Services = () => {
  return (
    <section className="bg-[#0b0b0b]">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
          <FontAwesomeIcon icon={faCaretRight} className="text-[#d92525]" />
          My Services
        </p>
        <h2 className="mt-1 text-[34px] font-extrabold text-white">
          What Can I Do
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {profile.services.map((service) => (
            <article
              key={service.title}
              className="bg-[#1f1f1f] px-6 py-10 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <FontAwesomeIcon
                icon={serviceIcons[service.icon]}
                className="mb-5 text-[26px] text-[#d92525]"
              />
              <h3 className="text-[14px] font-bold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-[12px] leading-[1.7] text-[#aab4c8]">
                {service.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
