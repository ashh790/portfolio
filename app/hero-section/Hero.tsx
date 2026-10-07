import Photo from "../components/Photo";
import Typewriter from "../components/Typewriter";
import FlipText from "../components/FlipText";
import { profile } from "../data/profile";
import { poppins } from "../fonts/poppins";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-68px)] items-center bg-[#0b0b0b]"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-8 md:grid-cols-2 md:px-10 md:py-10">
        <div>
          <FlipText
            as="p"
            text="Hello, My Name Is"
            className={`${poppins.className} text-[20px] font-black`}
            wordClassNames={["text-white", "text-[#d92525]", "text-[#d92525]", "text-[#d92525]"]}
          />
          <div className="mt-2">
            <Typewriter
              name={profile.name.toUpperCase()}
              className={`${poppins.className} text-[36px] font-extrabold leading-tight text-white md:text-[50px]`}
            />
          </div>
          <FlipText
            as="p"
            text={`- ${profile.tagline}`}
            className={`${poppins.className} mt-4 block max-w-[420px] text-[14px] font-medium leading-relaxed text-[#aab4c8]`}
          />
          <a
            href="#contact"
            className="mt-8 inline-block bg-[#d92525] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#a51b1b]"
          >
            Contact me
          </a>
        </div>

        {/* Width-driven on mobile so it stays inside its column; height-driven (sized to
            the screen height) from md up, where there's room for it to sit beside the
            text without needing the page to scroll. */}
        <div className="mx-auto aspect-square w-full max-w-[420px] md:mx-0 md:h-[min(68vh,540px)] md:w-auto md:max-w-none md:justify-self-end">
          <Photo src="/profile.jpg" alt={profile.name} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
