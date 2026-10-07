import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ProjectImage from "../components/ProjectImage";
import { profile } from "../data/profile";

const Works = () => {
  return (
    <section id="works" className="bg-[#161616]">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
          <FontAwesomeIcon icon={faCaretRight} className="text-[#d92525]" />
          My Works
        </p>
        <h2 className="mt-1 text-[34px] font-extrabold text-white">Projects I&apos;ve Built</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {profile.projects.map((project) => (
            <article key={project.name} className="group flex flex-col bg-[#1f1f1f] transition-transform duration-300 hover:-translate-y-1">
              <div className="h-28 w-full overflow-hidden md:h-32">
                <ProjectImage src={project.image} alt={project.name} />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[16px] font-bold text-white">{project.name}</h3>
                <small className="mt-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#d92525]">
                  {project.stack}
                </small>
                {/* Capped to 3 bullets so cards stay a consistent size as more detail (or
                    more projects) gets added. */}
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[11.5px] leading-[1.6] text-[#aab4c8]">
                  {project.points.slice(0, 3).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="mt-4 flex gap-5 text-[12px] font-semibold text-white">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d92525]">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Live Demo
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d92525]">
                      <FontAwesomeIcon icon={faGithub} /> Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
