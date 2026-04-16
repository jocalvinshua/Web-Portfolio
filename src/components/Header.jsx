import TextType from "../UI/TextType";

export default function Header() {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-4">
      
      <img
        src="./assets/profile-img.png"
        alt="Joshua Calvin - Web Developer"
        className="rounded-full w-40 sm:w-44 md:w-48"
      />

      <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-2 font-Ovo">
        <TextType
          text={["Halo, Salam Kenal!", "¡Hola!", "こんにちは", "Bonjour!", "안녕하세요!"]}
          typingSpeed={75}
          pauseDuration={2400}
          showCursor={true}
          cursorCharacter="|"
        />
        <img src="./assets/hand-icon.png" alt="Waving hand" className="w-6 mb-1" />
      </h3>

      <h1 className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo leading-tight">
        Aspiring Software Developer
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        
        <a
          href="#contact"
          className="px-10 py-2.5 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 hover:opacity-90 transition"
        >
          Contact Me
          <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
        </a>

        <a
          href="./assets/Joshua Calvin Siahaan - Resume.pdf"
          download
          className="px-10 py-2.5 rounded-full border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover flex items-center gap-2 bg-white dark:bg-transparent dark:text-white transition"
        >
          My Resume
          <img src="./assets/download-icon.png" alt="" className="w-4 dark:invert" />
        </a>

      </div>
    </div>
  );
}
