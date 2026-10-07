import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { profile } from "../data/profile";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#d92525] text-xs font-extrabold text-[#d92525] transition-all duration-300 hover:scale-110 hover:bg-[#d92525] hover:text-white">
          <span aria-hidden="true" className="absolute -inset-1.5 -z-10 animate-logo-glow rounded-full bg-[#d92525] blur-md" />
          AD
        </span>

        <div className="flex gap-6 text-[18px] text-white">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#d92525]">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#d92525]">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-[#d92525]">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>

        <p className="text-[12px] text-[#aab4c8]">
          &copy; {year} {profile.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
