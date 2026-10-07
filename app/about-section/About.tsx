import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faDatabase,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import { faJs, faNodeJs, faReact } from "@fortawesome/free-brands-svg-icons";
import Photo from "../components/Photo";
import { profile } from "../data/profile";

const skillIcons = {
  react: faReact,
  node: faNodeJs,
  js: faJs,
  server: faServer,
  database: faDatabase,
};

const About = () => {
  return (
    <section id="about" className="bg-[#161616]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-10">
        <div className="h-[420px] w-full">
          <Photo src="/profile-2.jpg" alt={profile.name} />
        </div>

        <div>
          <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
            <FontAwesomeIcon icon={faCaretRight} className="text-[#d92525]" />
            About me
          </p>
          <h2 className="mt-1 text-[34px] font-extrabold text-white">
            Who Am I
          </h2>

          <p className="mt-6 text-[13px] leading-[1.9] text-[#aab4c8]">
            {profile.summary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2.5 bg-[#1a1a1a] p-3.5 sm:grid-cols-3">
            {profile.skills.map((skill) => (
              <span
                key={skill.label}
                className="flex items-center justify-center gap-2 rounded-[3px] bg-[#1f1f1f] py-2.5 text-[12px] font-semibold text-white"
              >
                <FontAwesomeIcon
                  icon={skillIcons[skill.icon as keyof typeof skillIcons]}
                  className="text-[#d92525]"
                />
                {skill.label}
              </span>
            ))}
          </div>

          <a
            href={profile.cv}
            download
            className="mt-6 inline-block bg-[#d92525] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#a51b1b]"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
